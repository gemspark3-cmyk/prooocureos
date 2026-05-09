import { useTranslations } from 'next-intl'
import LegalLayout from '../LegalLayout'

export default function CookiePolicy() {
  const t = useTranslations('legal.cookies')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>;

  return (
    <LegalLayout title={t('title')}>
      <p>{t('intro')}</p>

      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </LegalLayout>
  )
}
