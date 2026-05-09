'use client'

import { useEffect, useCallback, useRef } from 'react'
import { procureos } from '@/lib/api'
import { toast } from 'react-hot-toast'

import { useTranslations } from 'next-intl'

/**
 * 🛡️ Auto-Logout Component
 * Logs out the user after 5 minutes of inactivity
 */
const INACTIVITY_LIMIT = 5 * 60 * 1000 // 5 Minutes

export function AutoLogout() {
  const t = useTranslations('common')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleLogout = useCallback(async () => {
    // Only logout if the user is actually logged in (check localStorage for UI state)
    const userData = typeof window !== 'undefined' ? localStorage.getItem('procureos_user') : null
    
    if (userData) {
      try {
        await procureos.auth.logout()
        localStorage.removeItem('procureos_user')
        toast.error(t('sessionExpired') || 'Session expired due to inactivity.', { id: 'auto-logout' })
        
        // Force reload or redirect to login
        window.location.href = '/login?reason=inactivity'
      } catch (error) {
        console.error('[AUTO-LOGOUT] Failed to logout:', error)
      }
    }
  }, [])

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT)
  }, [handleLogout])

  useEffect(() => {
    // List of activity events to track
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ]

    // Initialize timer
    resetTimer()

    // Add event listeners
    const handleActivity = () => resetTimer()
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity)
    })

    // Cleanup
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [resetTimer])

  return null // This component doesn't render anything
}
