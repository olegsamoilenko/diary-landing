import { getTranslations } from 'next-intl/server'
import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'
import { getLegalContact, legalUpdatedAt } from '@/lib/legal/contact'

type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  items?: string[]
  links?: { label: string; href: string }[]
}

export default async function LegalDocument({
  locale,
  kind,
}: {
  locale: string
  kind: 'TermsPage' | 'PrivacyPage'
}) {
  const t = await getTranslations({ locale, namespace: kind })
  const common = await getTranslations({ locale, namespace: 'Legal' })
  const sections = t.raw('Document.sections') as LegalSection[]
  const legalContact = getLegalContact(locale)

  return (
    <Container className="py-10">
      <article lang={locale}>
        <Title>{t('Document.title')}</Title>
        <Text className="mb-4">
          {common('updated')}{' '}
          <time dateTime={legalUpdatedAt}>{common('date')}</time>
        </Text>
        <Text className="mb-4">{t('Document.intro')}</Text>
        <section id="contact" className="mb-6">
          <Title level={2} className="mb-2">
            {common('contactTitle')}
          </Title>
          <Text className="mb-2">{common('contactIntro')}</Text>
          <dl className="mb-4 text-[14px] lg:text-[16px]">
            {Object.entries(legalContact).map(([key, value]) => (
              <div key={key} className="mb-1">
                <dt className="inline font-semibold">
                  {common(`contact.${key}`)}:{' '}
                </dt>
                <dd className="inline whitespace-pre-line">{value}</dd>
              </div>
            ))}
          </dl>
          <Text>
            {common('support')}{' '}
            <a className="underline" href="mailto:nemoryai.diary@gmail.com">
              nemoryai.diary@gmail.com
            </a>
          </Text>
        </section>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-6">
            <Title level={2} className="mb-2">
              {section.title}
            </Title>
            {section.paragraphs.map((paragraph, index) => (
              <Text key={index} className="mb-2">
                {paragraph}
              </Text>
            ))}
            {section.items && (
              <UnorderedList className="mb-4">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </UnorderedList>
            )}
            {section.links?.map((link) => (
              <Text key={link.href} className="mb-2">
                <a className="underline" href={link.href}>
                  {link.label}
                </a>
              </Text>
            ))}
          </section>
        ))}
        <nav
          aria-label={common('related')}
          className="flex flex-wrap gap-4 text-sm underline"
        >
          <a href={`/${locale}/terms`}>{common('terms')}</a>
          <a href={`/${locale}/privacy`}>{common('privacy')}</a>
          <a href={`/${locale}/delete-account`}>{common('deletion')}</a>
        </nav>
      </article>
    </Container>
  )
}
