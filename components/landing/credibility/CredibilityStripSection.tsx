import CredibilityCard from '@/components/landing/credibility/CredibilityCard'
import GooglePlayIcon from '@/components/landing/ui/GooglePlayIcon'
import { useTranslations } from 'next-intl'
import PrivateThoughtsIcon from '@/components/landing/credibility/PrivateThoughtsIcon'
import SelfUnderstandingAiIcon from '@/components/landing/credibility/SelfUnderstandingAiIcon'
import HeadIdeaIcon from '@/components/landing/credibility/HeadIdeaIcon'
import GoalsHabitsInsightsIcon from '@/components/landing/credibility/GoalsHabitsInsightsIcon'
import TargetIcon from '@/components/landing/credibility/TargetIcon'
import AvailableOnGooglePlayIcon from '@/components/landing/credibility/AvailableOnGooglePlayIcon'

export default function CredibilityStripSection() {
  const t = useTranslations('Sections.Credibility')
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/assets/images/backgrounds/credibility-strip-bg.png')",
      }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CredibilityCard icon={<PrivateThoughtsIcon size={40} />}>
            {t('card1')}
          </CredibilityCard>
          <CredibilityCard
            icon={<HeadIdeaIcon size={35} className="text-landing-primary" />}
          >
            {t('card2')}
          </CredibilityCard>
          <CredibilityCard
            icon={
              <TargetIcon
                size={30}
                startColor="oklch(0.78 0.07 210)"
                endColor="oklch(0.64 0.11 220)"
              />
            }
          >
            {t('card3')}
          </CredibilityCard>
          <CredibilityCard
            icon={
              <AvailableOnGooglePlayIcon
                size={35}
                className="text-landing-primary"
              />
            }
          >
            {t('card4')}
          </CredibilityCard>
        </div>
      </div>
    </section>
  )
}
