'use client'

import { useTranslations } from 'next-intl'
import LegalLayout from '../LegalLayout'

export default function SubscriptionAgreement() {
  const t = useTranslations('legal.subscription')
  const sections = t.raw('sections') as Array<{ title: string, content: string }>;

  return (
    <LegalLayout title={t('title')}>
      <p className="mb-8">{t('intro')}</p>

      {sections.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </LegalLayout>
  )
}
