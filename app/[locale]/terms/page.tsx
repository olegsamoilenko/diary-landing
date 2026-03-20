import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'

export default function TermsPage() {
  return (
    <Container className="py-10">
      <Title>Nemory — Terms of Use</Title>
      <Text className="mb-4">Last updated: November 22, 2025</Text>
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
        confirm you are at least 13
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
      <Text className="mb-4">
        Subscriptions are offered via Apple App Store or Google Play with
        regional pricing.
      </Text>
      <UnorderedList className="mb-4">
        <li>
          Auto-renewal: subscriptions renew automatically unless canceled before
          the end of the current period.
        </li>
        <li>
          Cancellation/Refunds: governed by the relevant store’s policies
          (Apple/Google).
        </li>
        <li>Restore purchases: available via the stores.</li>
        <li>
          Receipt verification: we verify receipts/tokens to determine plan
          status.
        </li>
        <li>
          We may change prices/plans; changes take effect in the next billing
          cycle after notice (where feasible in-app/on site).
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        5) User Content & License
      </Title>
      <Text className="mb-4">
        You retain ownership of your entries and other content.
      </Text>
      <Text className="mb-4">
        Your journal content is stored locally on your device in an encrypted
        database, as described in the Privacy Policy. When you use AI or other
        online features, you grant us and our third-party providers a limited,
        non-exclusive, revocable license to process your content only as needed
        to provide the Service (for example: sending selected text to AI
        providers, generating and returning responses, maintaining account-level
        features), in line with the Privacy Policy.
      </Text>
      <Text className="mb-4">
        You warrant your content does not infringe third-party rights or the
        law.
      </Text>
      <Title className="mb-2" level={3}>
        6) AI Features & Disclaimers
      </Title>
      <Text className="mb-4">
        AI outputs may be inaccurate or incomplete. Nemory does not provide
        medical, psychotherapy, legal, or financial advice. In emergencies,
        contact local services/professionals.
      </Text>
      <Text className="mb-4">
        To tailor responses, the Service may use your current entry together
        with relevant prior entries, dialogues, and long-term memory taken from
        your device’s encrypted local database.
      </Text>
      <Text className="mb-4">
        We use third-party AI providers to generate responses, as described in
        the Privacy Policy. Where possible, we configure them not to use your
        content to train their models beyond providing the Service.
      </Text>
      <Title className="mb-2" level={3}>
        7) Prohibited Conduct
      </Title>
      <Text className="mb-4">You agree not to:</Text>
      <UnorderedList className="mb-4">
        <li>
          post or share unlawful content; child sexual content; hate or explicit
          incitement to violence;
        </li>
        <li>
          engage in spam, harmful interference, or attempts to damage the
          Service;
        </li>
        <li>infringe intellectual property or privacy rights;</li>
        <li>circumvent technical limits, security, or access controls;</li>
        <li>attempt to identify or track other users without their consent.</li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        8) Termination
      </Title>
      <Text className="mb-4">
        You may stop using the Service at any time. We may suspend or terminate
        access for violations of these Terms or law, or if required by law
        enforcement or competent authorities. We may also remove inactive
        accounts without an active subscription after a reasonable period, as
        described in the Privacy Policy.
      </Text>
      <Title className="mb-2" level={3}>
        9) Deletion of Account & Data
      </Title>
      <Text className="mb-4">Deletion is self-service:</Text>
      <UnorderedList className="mb-4">
        <li>in-app: Settings → Profile → Delete account; or</li>
        <li>
          on the web: https://nemoryai.com/delete-account . Once confirmed,
          deletion runs automatically. Exceptions (logs up to 30 days;
          de-identified payment records; support messages) are described in the
          Privacy Policy.
        </li>
      </UnorderedList>
      <Text className="mb-4">
        Deleting your account does not automatically delete local journal data
        or backup files stored on your device or in locations you control. You
        are responsible for deleting local entries, uninstalling the app, and
        removing any backups you created if you wish to erase them.
      </Text>
      <Title className="mb-2" level={3}>
        10) Nemory IP
      </Title>
      <Text className="mb-4">
        The Service, logos, design, code, and other Nemory-created content
        belong to us or our licensors and are protected by law. No IP rights are
        granted except as expressly stated in these Terms.
      </Text>
      <Title className="mb-2" level={3}>
        11) Third-Party Services
      </Title>
      <Text className="mb-4">
        The Service may reference or interact with third-party services (such as
        AI providers, email providers, push notification services, and app
        stores). We do not control their terms, policies, or availability. Your
        use of those services is governed by their respective terms and privacy
        policies.
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
        To the extent permitted by law, we are not liable for indirect,
        incidental, or punitive damages, loss of data or profits, or
        acts/omissions of third parties. Our aggregate liability for claims
        relating to the Service is limited to the amount you paid for the
        Service in the last 12 months, unless mandatory law provides otherwise.
      </Text>
      <Title className="mb-2" level={3}>
        14) Changes to the Terms
      </Title>
      <Text className="mb-4">
        We may update these Terms. If we do, we will post the updated version
        and update the date at the top. Changes take effect when posted, unless
        otherwise required by law.
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
