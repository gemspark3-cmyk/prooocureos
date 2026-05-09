# ProcureOS Client Terminal Template

This is a premium, high-performance starter template for building custom applications on top of the **ProcureOS Autonomous Trade Infrastructure**.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file:
   ```env
   PROCUREOS_API_URL=http://localhost:4000/api
   PROCUREOS_API_KEY=your_secret_key_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🛡️ Security & Production Readiness

This template is designed with a "Security-First" approach, but requires correct configuration for production use:

### 1. API Key Protection (CRITICAL)
- **NEVER** use `NEXT_PUBLIC_` prefix for your `PROCUREOS_API_KEY`.
- The included **Server-Side Proxy** (`/api/proxy`) is the ONLY safe way to communicate with the Core API. It automatically appends your secret key on the server, keeping it hidden from the browser.
- We have implemented a **Whitelist Guard** in the proxy that only allows requests to authorized `/public` and `/v1` endpoints.

### 2. SSRF & Injection Protection
The `/api/proxy` route includes built-in validation to prevent Server-Side Request Forgery (SSRF). It blocks suspicious URL patterns and internal keywords (developer, admin, etc.) to ensure your terminal cannot be used as a tunnel to attack the Core infrastructure.

### 3. Session Management (SECURED)
By default, this template is now hardened with **HttpOnly, Secure, and SameSite=Strict Cookies**.
- We have completely removed `localStorage` based session storage to prevent XSS-based session hijacking.
- The `/api/proxy` layer automatically forwards these cookies to the Core API, ensuring a seamless and secure authentication flow.
- All sensitive operations are protected by database-level Audit Logs.

### 4. Deployment Safety
When deploying to Vercel or similar platforms:
- Ensure `PROCUREOS_API_KEY` is set as an **Environment Variable** in your dashboard, NOT in your code.
- Always use HTTPS to protect the data transmitted between your buyers and this terminal.

## 🛠️ Architecture

- **Next.js 15+**: App Router & Server Actions.
- **Tailwind CSS**: Modern, utility-first styling.
- **Framer Motion**: Premium micro-animations.
- **ProcureOS SDK**: Lightweight abstraction layer in `src/lib/api.ts`.

## 📈 Integration Points

- **Marketplace Search**: `procureos.searchSuppliers()`
- **RFQ Intent Flow**: `procureos.createIntent()` and `procureos.confirmRFQ()`
- **Buyer Dashboard**: `procureos.auth.listRequests()` and `procureos.auth.listOrders()`

---
Built by **Engine AI Index** for the ProcureOS Ecosystem.
