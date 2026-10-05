import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'

/** Shared by the locale-prefixed and unprefixed privacy routes. */
export default function PrivacyAdvertisingSection() {
  return (
    <section id="advertising-and-consent">
      <Title className="mb-2" level={3}>
        Advertising and your choices
      </Title>
      <Text className="mb-2">
        The Android app uses Google AdMob (Google Mobile Ads SDK) to display
        native ads within content and full-screen ads at breaks between actions
        for users whose access includes advertising. An active ad-free
        subscription or another plan that includes ad-free access removes these
        ads for the duration of that access.
      </Text>
      <Text className="mb-2">
        When advertising services are used, Google and its advertising partners
        may process the following data to deliver and measure ads, perform
        analytics, and prevent fraud:
      </Text>
      <UnorderedList className="mb-4">
        <li>IP address, which can be used to estimate approximate location;</li>
        <li>
          app and ad interactions, such as launches, taps, and video views;
        </li>
        <li>
          diagnostic and performance information about the app and ad SDK;
        </li>
        <li>
          device identifiers, including the Android advertising ID and app set
          ID, and, where applicable, identifiers associated with signed-in
          accounts on the device.
        </li>
      </UnorderedList>
      <Text className="mb-2">
        Nemory does not send private journal entries, check-in answers, mood
        records, goals, tasks, habits, AI conversations, or their attachments to
        AdMob or advertising partners. We do not use this content, or topics,
        keywords, interests, or profiles inferred from it, for advertising.
        Allowing personalized ads does not give us permission to use your
        private content for advertising. Our ad requests do not include your
        Nemory account ID, email, purchase tokens, or precise GPS location.
        Technical data collected by the advertising SDK is separate from your
        private journal content.
      </Text>
      <Text className="mb-2">
        We use Google&apos;s User Messaging Platform (UMP) to obtain and manage
        advertising privacy choices where required. Ads may be personalized,
        non-personalized, limited, or unavailable depending on your choices,
        region, and Google&apos;s requirements. Declining personalization does
        not purchase ad-free access, and non-personalized ads may still involve
        processing technical data. Where UMP requires a privacy-options entry
        point, you can reopen it in Nemory&apos;s Settings to review or change
        your choices, including withdrawing consent. You can also use Android
        settings to reset or delete your advertising ID.
      </Text>
      <Text className="mb-2">
        The SDK sends data using encrypted connections. Google&apos;s retention
        and privacy practices are described in its{' '}
        <a className="underline" href="https://policies.google.com/privacy">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          className="underline"
          href="https://policies.google.com/technologies/partner-sites"
        >
          information about data from partner apps
        </a>
        . The consent message, where shown, provides information about the
        advertising partners and available choices. An ad&apos;s information
        icon (AdChoices), where available, provides additional details and
        controls. Opening an advertiser&apos;s site or app is subject to that
        advertiser&apos;s privacy policy.
      </Text>
      <Text className="mb-4">
        We store ad-frequency counters and the history of our ad-free reminders
        locally on your device. These counters do not contain journal content.
        Ad-free access prevents future ad requests while that access is
        verified; it does not erase data already processed by advertising
        providers or disable processing needed for accounts, purchases, and
        other features you use.
      </Text>
    </section>
  )
}
