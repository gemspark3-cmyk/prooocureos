import { useTranslations } from 'next-intl';

export function useSystemError() {
  const t = useTranslations('systemErrors');

  const getErrorMessage = (error: any) => {
    if (!error) return t('default');
    
    const message = typeof error === 'string' ? error : (error.message || error.error || '');
    const code = error.code || '';

    // Standard Backend Codes mapping
    if (code === 'TOO_MANY_REQUESTS' || message.includes('Hız limitini') || message.toLowerCase().includes('too many requests')) return t('tooManyRequests');
    if (code === 'AUTH_FAILED' || message.includes('Giriş başarısız') || message.toLowerCase().includes('invalid login')) return t('authFailed');
    if (code === 'SESSION_EXPIRED' || message.includes('oturum süresi') || message.toLowerCase().includes('session expired')) return t('sessionExpired');
    if (code === 'FORBIDDEN' || message.includes('yetkiniz bulunmuyor') || message.toLowerCase().includes('forbidden')) return t('forbidden');
    if (code === 'EMAIL_ALREADY_EXISTS' || message.includes('kullanımda') || message.toLowerCase().includes('already in use')) return t('emailExists');
    if (code === 'VALIDATION_ERROR' || message.toLowerCase().includes('validation')) return t('validationError');
    
    // Fallback search in message
    if (message.toLowerCase().includes('password') && message.toLowerCase().includes('wrong')) return t('authFailed');
    if (message.toLowerCase().includes('not found')) return t('default');
    
    return message || t('default');
  };

  return { getErrorMessage };
}
