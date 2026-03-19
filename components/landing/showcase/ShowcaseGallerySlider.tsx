'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css/pagination'

import 'swiper/css'
import 'swiper/css/effect-coverflow'

type Locale = 'en' | 'uk'

type ShowcaseSlide = {
  id: string
  theme: string
}

const slides: ShowcaseSlide[] = [
  { id: '01', theme: 'breathe' },
  { id: '02', theme: 'silent-peaks' },
  { id: '03', theme: 'white-lotus' },
  { id: '04', theme: 'vintage-paper' },
  { id: '05', theme: 'leaf-scape' },
  { id: '06', theme: 'pastel-collage' },
  { id: '07', theme: 'ocean-depths' },
  { id: '08', theme: 'dream-achieve' },
  { id: '09', theme: 'dark' },
]

function getSlideImageSrc(id: string, locale: Locale) {
  return `/assets/images/theme/theme-screen-${id}-${locale}.png`
}

export default function ShowcaseGallerySlider() {
  const locale = useLocale() as Locale

  return (
    <div className="showcase-slider-wrap">
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        centeredSlides
        loop
        grabCursor
        slidesPerView={1}
        spaceBetween={16}
        speed={700}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 140,
          modifier: 1.8,
          scale: 0.92,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 7,
            spaceBetween: 24,
          },
        }}
        className="showcase-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="!h-auto">
            <div className="relative mx-auto w-[220px] sm:w-[200px] lg:w-[190px] 2xl:w-[180px]">
              <div className="overflow-hidden">
                <Image
                  src={getSlideImageSrc(slide.id, locale)}
                  alt={`${slide.theme} theme preview`}
                  width={1152}
                  height={2048}
                  className="block h-auto w-full"
                  priority={slide.id === '01'}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
