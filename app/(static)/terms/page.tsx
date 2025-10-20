import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'

export default function TermsPage() {
  return (
    <Container className="py-10">
      <Title>Nemory — Terms of Use</Title>
      <Text className="mb-4">Last updated: October 20, 2025</Text>
      <Title className="mb-2" level={3}>
        1) Acceptance
      </Title>
      <Text className="mb-4">
        By using Nemory (the “Service”), you agree to these Terms and the
        Privacy Policy. If you do not agree, do not use the Service.
      </Text>
      <Title className="mb-2" level={3}>
        2) Eligibility
      </Title>
      <Text className="mb-4">
        The Service is not directed to children under 13. By using Nemory, you
        confirm you are at least 13.
      </Text>
      <Title className="mb-2" level={3}>
        3) Account
      </Title>
      <Text className="mb-4">
        You are responsible for accurate account info, safeguarding your
        credentials, and all activity under your account. We may suspend or
        terminate access for violations of these Terms or the law.
      </Text>
      <Title className="mb-2" level={3}>
        4) Subscriptions & Payments
      </Title>
      <UnorderedList className="mb-4">
        <li>
          Subscriptions are offered via Apple App Store or Google Play with
          regional pricing.
        </li>
        <li>
          <strong>Auto-renewal. </strong> Subscriptions renew automatically
          unless canceled before the end of the current period.
        </li>
        <li>
          <strong>Cancellation/Refunds. </strong> Governed by the relevant
          store’s policies (Apple/Google).
        </li>
        <li>
          <strong>Restore purchases. </strong> Available via the stores.
        </li>
        <li>
          <strong>Receipt verification.</strong> We verify receipts/tokens to
          determine plan status.
        </li>
        <li>
          We may change prices/plans; changes take effect in the next billing
          cycle after notice (where feasible in-app/on site).
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        5) User Content & License
      </Title>
      <UnorderedList className="mb-4">
        <li>You retain ownership of your entries.</li>
        <li>
          You grant us a limited, non-exclusive, revocable license to process
          your content solely to provide the Service (storage, sync, AI
          responses, tag/similarity search, backups), as described in the
          Privacy Policy.
        </li>
        <li>
          You warrant your content does not infringe third-party rights or the
          law.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        6) AI Features & Disclaimers
      </Title>
      <UnorderedList className="mb-4">
        <li>
          AI outputs may be inaccurate or incomplete. Nemory does not provide
          medical, psychotherapy, legal, or financial advice. In emergencies,
          contact local services/professionals.
        </li>
        <li>
          To tailor responses, the Service automatically may use your current
          entry plus relevant prior entries/dialogues (matched by tags).
        </li>
        <li>
          We currently use OpenAI API; we do not opt in to allow training on
          your content. See the Privacy Policy.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        7) Prohibited Conduct
      </Title>
      <Text className="mb-4">
        No unlawful content; child sexual content; hate/violence; spam; harmful
        interference; IP infringement; circumventing technical limits; attempts
        to identify other users without consent.
      </Text>
      <Title className="mb-2" level={3}>
        8) Termination
      </Title>
      <Text className="mb-4">
        You may stop using the Service at any time. We may suspend/terminate
        access for violations of these Terms/law or if required by law
        enforcement.
      </Text>
      <Title className="mb-2" level={3}>
        9) Deletion of Account & Data
      </Title>
      <Text className="mb-4">Deletion is self-service:</Text>
      <UnorderedList className="mb-4">
        <li>in-app: Settings → Delete account; or</li>
        <li>
          on the web: https://nemoryai.com/delete-account . Once confirmed,
          deletion runs automatically. Exceptions (logs up to 30 days;
          de-identified payment records; support messages) are described in the
          Privacy Policy.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        10) Nemory IP
      </Title>
      <Text className="mb-4">
        The Service, logos, design, code, and other Nemory-created content
        belong to us or our licensors and are protected by law. No IP rights are
        granted except as expressly stated here.
      </Text>
      <Title className="mb-2" level={3}>
        11) Third-Party Services
      </Title>
      <Text className="mb-4">
        The Service may reference or interact with third-party services (OpenAI,
        Mailgun, Apple/Google Push, etc.). We don’t control their policies or
        availability. Your use is governed by their terms.
      </Text>
      <Title className="mb-2" level={3}>
        12) Disclaimer of Warranties
      </Title>
      <Text className="mb-4">
        The Service is provided “as is” and “as available”. We do not warrant
        uninterrupted, error-free operation, that it meets your needs, or the
        accuracy/completeness of AI outputs.
      </Text>
      <Title className="mb-2" level={3}>
        13) Limitation of Liability
      </Title>
      <Text className="mb-4">
        To the extent permitted by law, we are not liable for
        indirect/incidental/punitive damages, loss of data/profits, or
        third-party acts/omissions. Our aggregate liability for claims relating
        to the Service is limited to the amount you paid in the last 12 months,
        unless mandatory law provides otherwise.
      </Text>
      <Title className="mb-2" level={3}>
        14) Changes to the Terms
      </Title>
      <Text className="mb-4">
        We may update these Terms. If we do, we will post the updated version
        and update the date at the top. Changes take effect when posted.
      </Text>
      <Title className="mb-2" level={3}>
        15) Governing Law; Consumer Rights
      </Title>
      <Text className="mb-4">
        These Terms apply subject to applicable law. If you are a consumer in
        the EU/EEA/UK, you benefit from the mandatory protections of your
        country of residence. Nothing in these Terms limits your non-waivable
        rights.
      </Text>
      <Title className="mb-2" level={3}>
        16) Contact
      </Title>
      <Text className="mb-4">
        Questions about these Terms: nemoryai.diary@gmail.com .
      </Text>
    </Container>
  )
}
