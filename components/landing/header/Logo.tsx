import Image from 'next/image'
import { useTranslations } from 'next-intl'
export default function Logo() {
  const t = useTranslations('Logo')
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/assets/icon_logo.png"
        alt="Nemory logo"
        width={220}
        height={273}
        className="h-10 w-auto"
        priority
      />
      <div className="leading-none">
        <div className="text-landing-primary text-[20px] font-semibold">
          Nemory
        </div>
        <div className="text-landing-primary mt-1 text-[11px] font-medium text-nowrap">
          {t('smartJournal')}
        </div>
      </div>
    </div>
  )
}
