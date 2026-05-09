import { useTranslations } from 'next-intl';

export function useSystemError() {
  const t = useTranslations('systemErrors');

  const getErrorMessage = (error: any) => {
    if (!error) return t('default');
    
    const message = typeof error === 'string' ? error : (error.message || error.error || '');
    const code = error.code || '';

    // Standard Backend Codes mapping
    if (code === 'TOO_MANY_REQUESTS' || message.includes('Hız limitini')) return t('tooManyRequests');
    if (code === 'AUTH_FAILED' || message.includes('Giriş başarısız')) return t('authFailed');
    if (code === 'SESSION_EXPIRED' || message.includes('oturum süresi')) return t('sessionExpired');
    if (code === 'FORBIDDEN' || message.includes('yetkiniz bulunmuyor')) return t('forbidden');
    if (code === 'EMAIL_ALREADY_EXISTS' || message.includes('kullanımda')) return t('emailExists');
    if (code === 'VALIDATION_ERROR') return t('validationError');
    
    // Fallback search in message
    if (message.toLowerCase().includes('password') && message.toLowerCase().includes('wrong')) return t('authFailed');
    if (message.toLowerCase().includes('not found')) return t('default');
    
    return message || t('default');
  };

  return { getErrorMessage };
}
