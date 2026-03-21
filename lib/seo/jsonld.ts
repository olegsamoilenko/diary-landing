type Locale = 'en' | 'uk'

const SITE_URL = 'https://nemoryai.com'
const APP_NAME = 'Nemory'

function getHomeUrl(locale: Locale) {
  return `${SITE_URL}/${locale}`
}

function getFaqItems(locale: Locale) {
  if (locale === 'uk') {
    return [
      {
        question: 'Що таке Nemory?',
        answer:
          'Nemory — це приватний застосунок для ведення щоденника, який допомагає фіксувати думки, краще розуміти себе завдяки AI та залишатися на зв’язку зі своїми цілями, звичками й особистим зростанням.',
      },
      {
        question:
          'Чим Nemory відрізняється від звичайного особистого щоденника?',
        answer:
          'Nemory поєднує приватний щоденник із AI-підтримкою, цілями, звичками та відстеженням прогресу. Це не лише місце для записів, а й простір, який допомагає краще розуміти себе й свій розвиток.',
      },
      {
        question:
          'Чи можу я використовувати Nemory як особистий щоденник для щоденних записів?',
        answer:
          'Так. Nemory добре підходить для особистих щоденних записів, думок, емоцій і переживань, а також дає додаткові інструменти для AI-відповідей, цілей, звичок і прогресу.',
      },
      {
        question: 'Як AI допомагає в Nemory?',
        answer:
          'AI в Nemory допомагає осмислювати записи, помічати закономірності та отримувати ясніші особисті інсайти. Він створений, щоб підтримувати ваші роздуми, а не замінювати їх.',
      },
      {
        question: 'Чи є мій щоденник приватним?',
        answer:
          'Ваш щоденник задуманий як особистий і приватний простір. Коли ви використовуєте AI-функції, релевантна частина записів безпечно передається нашим AI-провайдерам для формування відповідей. Це використовується лише для підтримки ваших роздумів.',
      },
      {
        question: 'Чи можна використовувати Nemory також для цілей і звичок?',
        answer:
          'Так. Nemory поєднує щоденник, цілі, звички та особисті інсайти в одному місці, щоб ваші щоденні думки й довгострокове зростання залишалися пов’язаними між собою.',
      },
      {
        question: 'Чи потрібно писати щодня?',
        answer:
          'Зовсім ні. Nemory поруч тоді, коли він вам потрібен, незалежно від того, пишете ви щодня чи лише тоді, коли хочеться зупинитися, подумати й розібратися у своїх думках.',
      },
      {
        question: 'Nemory — це лише щоденник?',
        answer:
          'Ні. Окрім ведення щоденника, Nemory допомагає працювати зі звичками, рухатися до цілей і краще бачити свій прогрес з часом.',
      },
      {
        question: 'Де можна завантажити Nemory?',
        answer: 'Наразі Nemory доступний у Google Play як Android-застосунок.',
      },
      {
        question: 'Для кого створений Nemory?',
        answer:
          'Nemory створений для тих, хто шукає спокійніший і більш усвідомлений спосіб вести щоденник, осмислювати свої думки й розвиватися, незалежно від того, чи ви працюєте над звичками, рухаєтесь до цілей або просто хочете краще розуміти себе.',
      },
    ]
  }

  return [
    {
      question: 'What is Nemory?',
      answer:
        'Nemory is a private journaling app that helps you capture your thoughts, reflect with AI, and stay connected to your goals, habits, and personal growth.',
    },
    {
      question: 'Is Nemory a journal or a diary app?',
      answer:
        'Nemory is designed first as a journal app for deeper reflection, personal growth, and daily self-understanding, but you can also use it as a private diary for your thoughts, feelings, and everyday life.',
    },
    {
      question: 'Can I use Nemory as a private diary?',
      answer:
        'Yes. Nemory can be used as a private diary for personal thoughts, emotions, and everyday experiences, while also giving you tools for AI reflection, goals, habits, and progress.',
    },
    {
      question: 'How does AI help inside Nemory?',
      answer:
        'AI in Nemory helps you reflect on what you write, notice patterns, and gain clearer personal insights. It is designed to support your thinking, not replace it.',
    },
    {
      question: 'Is my journal private?',
      answer:
        'Your journal is designed to be a personal and private space. When you use AI features, relevant parts of your entries are securely sent to our AI providers to generate responses. This is only used to support your reflection.',
    },
    {
      question: 'Can I use Nemory for goals and habits too?',
      answer:
        'Yes. Nemory brings together journaling, goals, habits, and personal insights in one place, so your daily thoughts and long-term growth stay connected.',
    },
    {
      question: 'Do I need to write every day?',
      answer:
        'Not at all. Nemory is here whenever you need it, whether you journal every day or only when you want to slow down, reflect, and process your thoughts.',
    },
    {
      question: 'Is Nemory only for journaling?',
      answer:
        'No. Along with journaling, Nemory helps you track habits, work toward goals, and better understand your progress over time.',
    },
    {
      question: 'Where can I download Nemory?',
      answer: 'Nemory is currently available on Google Play as an Android app.',
    },
    {
      question: 'Who is Nemory for?',
      answer:
        'Nemory is for anyone who wants a calmer, more thoughtful way to journal, reflect, and grow, whether you are building habits, working toward goals, or simply trying to understand yourself better.',
    },
  ]
}

export function getHomeJsonLd(locale: Locale) {
  const isUk = locale === 'uk'

  const description = isUk
    ? 'Приватний AI-щоденник для саморефлексії, відстеження настрою, звичок, цілей і особистісного розвитку.'
    : 'Private AI journal and diary app for self-reflection, mood tracking, habits, goals, and personal growth.'

  const webpageName = isUk
    ? 'Nemory - Розумний щоденник'
    : 'Nemory - Smart Journal'

  const inLanguage = isUk ? 'uk' : 'en'
  const homeUrl = getHomeUrl(locale)
  const faqItems = getFaqItems(locale)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        name: APP_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: APP_NAME,
        publisher: {
          '@id': `${SITE_URL}#organization`,
        },
        inLanguage,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${homeUrl}#app`,
        name: APP_NAME,
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Android',
        description,
        url: homeUrl,
        image: `${homeUrl}/opengraph-image`,
        publisher: {
          '@id': `${SITE_URL}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${homeUrl}#webpage`,
        url: homeUrl,
        name: webpageName,
        description,
        isPartOf: {
          '@id': `${SITE_URL}#website`,
        },
        about: {
          '@id': `${homeUrl}#app`,
        },
        inLanguage,
      },
      {
        '@type': 'FAQPage',
        '@id': `${homeUrl}#faq`,
        url: homeUrl,
        inLanguage,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }
}
