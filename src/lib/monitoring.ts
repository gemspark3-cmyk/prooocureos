/**
 * 📊 ProcureOS Monitoring & Analytics Engine
 * Centralized handler for Sentry (Errors) and PostHog (Analytics)
 */

type EventName = 
  | 'search_performed' 
  | 'rfq_created' 
  | 'offer_accepted' 
  | 'user_registered' 
  | 'user_logged_in' 
  | 'page_view';

export const monitoring = {
  /**
   * 🚨 Log Error to Sentry / Monitoring Service
   */
  error: (error: Error | string, context?: any) => {
    const message = typeof error === 'string' ? error : error.message;
    console.error(`[MONITORING ERROR] ${message}`, context);
    
    // TODO: Initialize Sentry and call Sentry.captureException(error)
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Sentry.captureException(error, { extra: context });
    }
  },

  /**
   * 📈 Track User Action to PostHog / Mixpanel
   */
  event: (name: EventName, properties?: Record<string, any>) => {
    console.log(`[ANALYTICS EVENT] ${name}`, properties);

    // TODO: Initialize PostHog and call posthog.capture(name, properties)
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      // posthog.capture(name, properties);
    }
  },

  /**
   * ⏱️ Measure Performance (e.g. Search Latency)
   * 🛡️ Thresholds: 1s for standard ops, 5s for AI/Vector ops
   */
  measure: (label: string, durationMs: number, thresholdMs: number = 1000) => {
    console.log(`[PERFORMANCE] ${label}: ${durationMs}ms`);
    
    if (durationMs > thresholdMs) {
      monitoring.error(`Slow Operation: ${label}`, { durationMs, threshold: thresholdMs });
    }
  }
};
