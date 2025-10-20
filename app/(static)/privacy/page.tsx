import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Title>Nemory — Privacy Policy</Title>
      <Text className="mb-4">Last updated: October 20, 2025</Text>

      <Title className="mb-2" level={3}>
        Who we are
      </Title>
      <Text className="mb-2">
        “Nemory” (“we”, “our”, the “Service”) is an AI-powered journaling app.
        Privacy contact: nemoryai.diary@gmail.com . If a legal entity or EU/UK
        representative is appointed, we will update this Policy.
      </Text>
      <Title className="mb-2" level={3}>
        What we do (product)
      </Title>
      <Text className="mb-2">
        Users create personal entries (text, images, styles/backgrounds),
        receive AI analysis and tips, track mood/habits/goals, and can use an AI
        chat that accesses relevant entries for insights. Monetization:
        subscriptions via App Store / Google Play with regional pricing,
        purchase restore, and receipt verification.
      </Text>
      <Title className="mb-2" level={3}>
        Infrastructure & storage
      </Title>
      <UnorderedList className="mb-4">
        <li>
          <strong>Servers/DB.</strong> DigitalOcean (region AMS3, EU).
          PostgreSQL in DigitalOcean Managed PostgreSQL (AMS3) with automatic
          backups.
        </li>
        <li>
          <strong>Encryption.</strong> Journal content is stored encrypted at
          rest. Key management via AWS KMS (eu-central-1, Frankfurt) with annual
          key rotation.
        </li>
        <li>
          {' '}
          <strong>In transit. </strong> TLS.
        </li>
        <li>
          <strong>Client.</strong> We minimize unencrypted text on device
          (ephemeral for render/edit).
        </li>
        <li>
          <strong>Local identifiers.</strong> Anonymous Installation ID (random
          UUID), no IDFA/AAID.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        Data we process
      </Title>
      <UnorderedList className="mb-4">
        <li>
          <strong>Journal content & AI chat.</strong>Entries, tags, and relevant
          prior dialogues (for context).
        </li>
        <li>
          <strong>Account data.</strong> Name/nickname (if provided), email (if
          used/verified), account identifier.
        </li>
        <li>
          <strong>Subscriptions/Payments. </strong> Subscription status, store
          receipts/tokens for verification (we do not receive card details).
        </li>
        <li>
          <strong>Technical data.</strong> Event logs, IP/device/OS/app
          version/timestamps, diagnostics.
        </li>
        <li>
          <strong>Push notifications.</strong> OS push frameworks (if enabled).
          Reminders are not active now; if that changes, we’ll update this
          Policy.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        How we use data
      </Title>
      <UnorderedList className="mb-4">
        <li>
          <strong>AI responses & personalization.</strong>When you interact with
          AI, we automatically provide the AI provider with your current entry
          plus similar past entries and relevant dialogues matched by tags so
          responses are tailored to you. We do not send payment tokens or your
          email address to the AI provider.
        </li>
        <li>
          <strong>Subscriptions & billing.</strong> Validate receipts/tokens
          with App Store / Google Play; store technical tokens to determine
          active plan and restore purchases.
        </li>
        <li>
          <strong>Service improvement & safety.</strong> Diagnostics, abuse
          prevention, support.
        </li>
        <li>
          <strong>Ads performance without tracking IDs.</strong> We measure our
          own campaign performance in aggregate (UTM/campaign ID,
          SKAdNetwork/Install Referrer) without cross-app advertising
          identifiers (IDFA/AAID). Ad platforms may collect data under their own
          policies as independent controllers.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        Providers/Sub-processors
      </Title>
      <UnorderedList className="mb-1">
        <li>
          <strong>OpenAI API</strong> — AI processing. We do not opt in to allow
          training on your content.
        </li>
        <li>
          <strong>Mailgun</strong> (domain mail.nemoryai.com) — service emails
          (verification, system).
        </li>
        <li>
          <strong>Push</strong>(if used) — OS providers (Apple/Google) or Expo
          Push.
        </li>
      </UnorderedList>
      <Text className="mb-4">
        The list may change; we will update this Policy accordingly.
      </Text>
      <Title className="mb-2" level={3}>
        Legal bases (GDPR-style)
      </Title>
      <UnorderedList className="mb-1">
        <li>
          <strong>Contract performance:</strong> provide the Service (store
          entries, AI features), process subscriptions.
        </li>
        <li>
          <strong>Legitimate interests:</strong> security, abuse prevention,
          service improvements.
        </li>
        <li>
          <strong>Consent (where applicable):</strong> e.g., marketing
          emails/analytics if enabled.
        </li>
        <li>
          <strong>Legal obligation:</strong> bookkeeping for subscriptions,
          responding to lawful requests.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        International transfers
      </Title>
      <Text className="mb-4">
        Your data may be processed outside your country by AI providers or
        infrastructure partners. We apply appropriate safeguards (e.g., EU
        SCCs).
      </Text>
      <Title className="mb-2" level={3}>
        Retention
      </Title>
      <UnorderedList className="mb-1">
        <li>
          <strong>Journal entries:</strong> kept until you delete them or your
          account.
        </li>
        <li>
          <strong>Logs:</strong> up to 30 days, with daily cleanup.
        </li>
        <li>
          <strong>DB backups:</strong> up to 30 days.
        </li>
        <li>
          <strong>Subscription receipts/tokens:</strong> for the subscription
          term plus a reasonable period for disputes/refunds.
        </li>
        <li>
          <strong>KMS keys:</strong> annual rotation.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        Deletion
      </Title>
      <Text className="mb-4">You can delete your account in two ways:</Text>
      <UnorderedList className="mb-1">
        <li>In the app (Settings - Profile - Delete Account)</li>
        <li>
          In your browser at{' '}
          <a href="https://nemoryai.com/delete-account">
            https://nemoryai.com/delete-account
          </a>
        </li>
      </UnorderedList>
      <Text className="mb-1">Аll data will be deleted except for:</Text>
      <Text className="mb-1">(i) logs (kept up to 30 days),</Text>
      <Text className="mb-1">
        (ii) payment records (de-identified; user set to null) retained as
        legally required,
      </Text>
      <Text className="mb-4">
        (iii) support messages retained to handle requests and protect rights.
      </Text>
      <Title className="mb-2" level={3}>
        Children’s privacy
      </Title>
      <Text className="mb-4">
        Our Service is not directed to children under 13. We do not knowingly
        collect personal data from anyone under 13. If you are a parent/guardian
        and believe your child has provided us with personal data, contact
        nemoryai.diary@gmail.com and we will delete it.
      </Text>
      <Title className="mb-2" level={3}>
        Contact
      </Title>
      <Text className="mb-1">You can contact us in two ways:</Text>
      <UnorderedList className="mb-1">
        <li>Through the app (settings - support)</li>
        <li>By mail (nemoryai.diary@gmail.com)</li>
      </UnorderedList>
      <Text className="mb-4">
        We typically respond within 3 days and may ask you to verify your
        identity to protect your account.
      </Text>
      <Title className="mb-2" level={3}>
        Security
      </Title>
      <UnorderedList className="mb-1">
        <li>
          Encryption in transit and at rest; journal content stored encrypted.
        </li>
        <li>
          Keys managed via AWS KMS; least-privilege access controls;
          access/event logging.
        </li>
        <li>We do not sell personal data.</li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        Changes to this Policy
      </Title>
      <Text className="mb-4">
        We may update this Policy. If we make changes, we will post the updated
        version on this page and update the date at the top. Changes take effect
        when posted. Please review this page periodically to stay informed about
        what information we collect and how we use it.
      </Text>
    </Container>
  )
}
