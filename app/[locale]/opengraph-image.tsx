import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type Props = {
  params?: Promise<{ locale?: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nemoryai.com'

function asset(path: string) {
  return new URL(path, SITE_URL).toString()
}

function getCopy(locale: string) {
  const isUk = locale === 'uk'

  return {
    title: 'Nemory',
    subtitle: isUk ? 'Розумний щоденник' : 'Smart Journal',
    headlineTop: isUk ? 'Розумний щоденник' : 'Smart journal',
    headlineMiddle: isUk ? 'для думок,' : 'for thoughts,',
    headlineBottomStart: isUk ? 'цілей і розвитку' : 'goals and growth',
    headlineBottomAccent: isUk ? ' з AI' : ' with AI',
    description: isUk
      ? 'Приватний AI-щоденник для саморефлексії, відстеження настрою, звичок, цілей і особистісного розвитку.'
      : 'Private AI journal and diary app for self-reflection, mood tracking, habits, goals, and personal growth.',
    pill1: isUk ? 'AI щоденник' : 'AI Journal',
    pill2: isUk ? 'Відстеження настрою' : 'Mood Tracking',
    pill3: isUk ? 'Цілі та звички' : 'Goals and Habits',
    pill4: isUk ? 'Аналітика прогресу' : 'Progress Analytics',
  }
}

export default async function OpenGraphImage({ params }: Props = {}) {
  const resolvedParams = params ? await params : undefined
  const locale = resolvedParams?.locale === 'uk' ? 'uk' : 'en'
  const copy = getCopy(locale)

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F8F5EF',
        color: '#5E6E7D',
        fontFamily: 'sans-serif',
      }}
    >
      <img
        src={asset('/assets/images/backgrounds/hero-bg.png')}
        alt=""
        width={1200}
        height={630}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(248,245,239,0.95) 0%, rgba(248,245,239,0.9) 42%, rgba(248,245,239,0.5) 74%, rgba(248,245,239,0.18) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          width: '100%',
          height: '100%',
          padding: '44px 54px 40px 58px',
        }}
      >
        <div
          style={{
            width: '56%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
            }}
          >
            <img
              src={asset('/assets/icon_logo_primary.png')}
              alt=""
              width={1280}
              height={1581}
              style={{
                width: 48,
                height: 59,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 1,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#438EA5',
                  letterSpacing: -0.4,
                }}
              >
                {copy.title}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#438EA5',
                }}
              >
                {copy.subtitle}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 18,
              maxWidth: 620,
              lineHeight: 1.02,
              letterSpacing: -2.2,
              fontWeight: 400,
              color: '#4A5565',
            }}
          >
            <div
              style={{
                fontSize: 56,
                color: '#67BED8',
              }}
            >
              {copy.headlineTop}
            </div>

            <div
              style={{
                fontSize: 56,
                marginTop: 2,
              }}
            >
              {copy.headlineMiddle}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                fontSize: 56,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  textWrap: 'nowrap',
                }}
              >
                {copy.headlineBottomStart}
              </span>
              <span
                style={{
                  color: '#67BED8',
                  marginLeft: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                {copy.headlineBottomAccent}
              </span>
            </div>
          </div>

          <div
            style={{
              maxWidth: 650,
              fontSize: 23,
              lineHeight: 1.45,
              color: '#6C7886',
              marginBottom: 28,
            }}
          >
            {copy.description}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              maxWidth: 680,
            }}
          >
            {[copy.pill1, copy.pill2, copy.pill3, copy.pill4].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 44,
                  padding: '0 18px',
                  borderRadius: 999,
                  backgroundColor: '#F6F3EE',
                  border: '1px solid #E6E0D8',
                  color: '#49576A',
                  fontSize: 18,
                  fontWeight: 500,
                  boxShadow: '0 8px 24px rgba(31, 42, 55, 0.06)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: '44%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 410,
              height: 410,
              borderRadius: 999,
              background: 'rgba(103, 190, 216, 0.18)',
              filter: 'blur(18px)',
              right: 12,
              top: 88,
            }}
          />

          <img
            src={asset('/assets/images/screens/screen-2.png')}
            alt=""
            width={1152}
            height={2048}
            style={{
              position: 'absolute',
              right: 220,
              top: 112,
              width: 210,
              height: 440,
              objectFit: 'contain',
              transform: 'rotate(-8deg)',
            }}
          />

          <img
            src={asset('/assets/images/screens/screen-1.png')}
            alt=""
            width={1152}
            height={2048}
            style={{
              position: 'absolute',
              right: 105,
              top: 78,
              width: 240,
              height: 490,
              objectFit: 'contain',
            }}
          />

          <img
            src={asset('/assets/images/screens/screen-3.png')}
            alt=""
            width={1152}
            height={2048}
            style={{
              position: 'absolute',
              right: -8,
              top: 112,
              width: 210,
              height: 440,
              objectFit: 'contain',
              transform: 'rotate(8deg)',
            }}
          />
        </div>
      </div>
    </div>,
    size,
  )
}
