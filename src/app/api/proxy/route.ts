import { NextResponse } from 'next/server'

/**
 * 🛡️ SECURE API PROXY with RATE LIMITING
 */

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100 // Limit per IP
const ipCache = new Map<string, { count: number, lastReset: number }>()

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, backoff = 300): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    // Only retry on server-side errors (5xx)
    if (response.status >= 500 && retries > 0) {
      console.warn(`[PROXY] Upstream error ${response.status}. Retrying in ${backoff}ms... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    return response;
  } catch (err) {
    if (retries > 0) {
      console.warn(`[PROXY] Network error. Retrying in ${backoff}ms... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw err;
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
  const now = Date.now()
  
  // Rate Limit Logic
  const userRate = ipCache.get(ip) || { count: 0, lastReset: now }
  if (now - userRate.lastReset > RATE_LIMIT_WINDOW) {
    userRate.count = 0
    userRate.lastReset = now
  }
  
  userRate.count++
  ipCache.set(ip, userRate)

  if (userRate.count > MAX_REQUESTS_PER_WINDOW) {
    return NextResponse.json({ error: 'TOO_MANY_REQUESTS', message: 'Rate limit exceeded. Please wait a moment.' }, { status: 429 })
  }
  const CORE_BASE_URL = process.env.PROCUREOS_API_URL || 'http://127.0.0.1:4000/api'
  const API_KEY = process.env.PROCUREOS_API_KEY
  const TRACE_ID = req.headers.get('x-trace-id') || 'untracked-' + Date.now()

  if (!API_KEY) {
    return NextResponse.json({ error: 'SERVER_CONFIG_ERROR', message: 'API Key not configured on server.' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { endpoint, method = 'GET', data, headers = {} } = body

    // 🛡️ SECURITY: Endpoint Whitelist & Validation
    const ALLOWED_PREFIXES = ['/public/', '/v1/'] 
    const BLOCKED_KEYWORDS = ['developer', 'internal', 'admin', 'config']
    
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    
    const isAllowed = ALLOWED_PREFIXES.some(p => cleanEndpoint.startsWith(p))
    const containsBlocked = BLOCKED_KEYWORDS.some(k => cleanEndpoint.toLowerCase().includes(k))

    if (!isAllowed || containsBlocked) {
      console.warn(`[SECURITY] Blocked suspicious proxy attempt: ${method} ${cleanEndpoint}`)
      return NextResponse.json({ 
        error: 'FORBIDDEN_ENDPOINT', 
        message: 'This proxy only allows access to public marketplace endpoints.' 
      }, { status: 403 })
    }

    if (cleanEndpoint.includes('@') || cleanEndpoint.includes('://') || cleanEndpoint.includes('..')) {
      return NextResponse.json({ error: 'INVALID_ENDPOINT' }, { status: 400 })
    }

    // 🛡️ SECURITY: CSRF Protection (Check for custom header)
    const requestedWith = req.headers.get('x-requested-with')
    if (method !== 'GET' && requestedWith !== 'XMLHttpRequest' && requestedWith !== 'ProcureOS-Client') {
      console.warn(`[SECURITY] Potential CSRF attempt blocked: ${method} ${cleanEndpoint}`)
      return NextResponse.json({ error: 'CSRF_PROTECTION_TRIGGERED', message: 'Security verification failed.' }, { status: 403 })
    }

    // 🛡️ SECURITY: Header Whitelist
    const SAFE_HEADERS = ['accept-language', 'x-trace-id', 'content-type', 'authorization', 'x-session-token', 'x-requested-with']
    const filteredHeaders: Record<string, string> = {}
    
    Object.keys(headers).forEach(key => {
      if (SAFE_HEADERS.includes(key.toLowerCase())) {
        filteredHeaders[key] = headers[key]
      }
    })

    // 🛡️ SECURITY: Extract session token from cookie if available
    const cookies = req.headers.get('cookie') || ''
    const cookieToken = cookies.split(';').find(c => c.trim().startsWith('procureos_session_token='))?.split('=')[1]

    const response = await fetchWithRetry(`${CORE_BASE_URL}${cleanEndpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'x-trace-id': TRACE_ID,
        'x-requested-with': requestedWith || 'ProcureOS-Client',
        'Cookie': cookies,
        'x-session-token': cookieToken || '', // Forward cookie token to upstream header
        ...filteredHeaders
      },
      body: (method !== 'GET' && method !== 'HEAD' && data) ? JSON.stringify(data) : undefined
    })

    const resData = await response.json().catch(async (e) => {
       console.error(`[PROXY] JSON Parse Error from Upstream:`, e.message);
       return { error: 'INVALID_JSON', message: 'Upstream returned non-JSON response.' };
    });
    
    // 🛡️ SECURITY: Session Token Hardening (Move from JSON to HttpOnly Cookie)
    let sessionToken = resData.token;
    if (cleanEndpoint.includes('/auth/login') || cleanEndpoint.includes('/auth/register')) {
       if (resData.token) {
          // Remove token from JSON body so it's not stored in localStorage by the client
          delete resData.token;
       }
    }

    // 🛡️ SECURITY: Extra Layer - Sanitize Search Results
    if (cleanEndpoint.includes('/search') && resData.results) {
       resData.results = resData.results.map((s: any) => ({
          id: s.id,
          name: s.name || s.company_name,
          category: s.category,
          location: s.location,
          rating: s.rating,
          verified: s.verified,
          // Explicitly omit phone, email, tax_id in public search
       }));
    }

    if (response.status >= 500) {
      console.error(`[PROXY] Critical API Error ${response.status} at ${cleanEndpoint}:`, JSON.stringify(resData).substring(0, 500));
    }

    const nextResponse = NextResponse.json(resData, { status: response.status })

    // Handle session token cookie
    if (sessionToken) {
       nextResponse.cookies.set('procureos_session_token', sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7 // 1 week
       });
    } else if (cleanEndpoint.includes('/auth/logout')) {
       nextResponse.cookies.delete('procureos_session_token');
    }

    const setCookie = response.headers.get('set-cookie')
    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse
  } catch (err: any) {
    console.error(`[PROXY] Fatal Error:`, err.message);
    return NextResponse.json({ error: 'PROXY_ERROR', message: err.message }, { status: 500 })
  }
}
