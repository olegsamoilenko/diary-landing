import Image from 'next/image'
import { useTranslations } from 'next-intl'
export default function Logo() {
  const t = useTranslations('Logo')
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/assets/icon_logo_primary.png"
        alt="Nemory logo"
        width={220}
        height={273}
        className="h-10 w-auto"
        priority
      />
      <div className="leading-none">
        <div className="text-[20px] font-semibold text-[#438EA5]">Nemory</div>
        <div className="mt-1 text-[11px] font-medium text-nowrap text-[#438EA5]">
          {t('smartJournal')}
        </div>
      </div>
    </div>
  )
}
