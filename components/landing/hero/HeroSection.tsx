import Image from 'next/image'
import Title from './Title'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('Header.Menu')
  return (
    <section
      className="relative h-[700px] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/backgrounds/hero-bg.png')",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <Title className="mb-6" />
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/assets/images/screens/screen-3.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative left-14 z-1 h-[190px] w-auto bg-transparent"
            priority
          />
          <Image
            src="/assets/images/screens/screen-1.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative z-2 w-auto bg-transparent"
            priority
          />
          <Image
            src="/assets/images/screens/screen-2.png"
            alt="Nemory logo"
            width={100}
            height={200}
            className="relative right-14 z-1 h-[190px] w-auto bg-transparent"
            priority
          />
        </div>
      </div>
    </section>
  )
}
