import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import UnorderedList from '@/components/static/UnorderedList'

export default function PrivacyPage() {
  return (
    <Container className="py-10">
      <Title>Nemory — Privacy Policy</Title>
      <Text className="mb-4">Last updated: November 22, 2025</Text>

      <Title className="mb-2" level={3}>
        Who we are
      </Title>
      <Text className="mb-2">
        “Nemory” (“we”, “our”, the “Service”) is an AI-powered journaling app.
      </Text>
      <Text className="mb-2">Privacy contact: nemoryai.diary@gmail.com.</Text>
      <Text className="mb-2">
        If a legal entity or EU/UK representative is appointed, we will update
        this Policy.
      </Text>
      <Title className="mb-2" level={3}>
        What we do (product)
      </Title>
      <Text className="mb-2">
        Nemory is a personal journal with AI support. Users can:
      </Text>
      <UnorderedList className="mb-4">
        <li>create personal entries (text, images, styles/backgrounds);</li>
        <li>track mood, habits, and goals;</li>
        <li>receive AI analysis, reflections, and tips;</li>
        <li>
          use an AI chat that can reference relevant past entries and
          user-specific memory.
        </li>
      </UnorderedList>
      <Text className="mb-2">
        The app is designed as offline-first: your journal content lives
        primarily on your device in an encrypted local database. We do not store
        your journal entries on our servers.
      </Text>
      <Text className="mb-2">
        Monetization: subscriptions via App Store / Google Play with regional
        pricing, purchase restore, and receipt verification.
      </Text>
      <Title className="mb-2" level={3}>
        Where your data lives
      </Title>
      <Text className="mb-2">
        <strong>1. On your device (local storage)</strong>
      </Text>
      <UnorderedList className="mb-4">
        <li>
          All journal entries, including text, images, tags, styles/backgrounds,
          and AI comments, are stored locally on your device in an encrypted
          database.
        </li>
        <li>
          The encryption key is stored securely on your device (for example, in
          a secure keychain/secure storage mechanism provided by the OS).
        </li>
        <li>We (Nemory) do not have direct access to this local database.</li>
      </UnorderedList>
      <Text className="mb-2">
        <strong>2. Backups of your journal (user-controlled)</strong>
      </Text>
      <UnorderedList className="mb-4">
        <li>
          Inside the app, you can create an encrypted backup of your local
          database.
        </li>
        <li>
          This backup file can be exported and stored wherever you choose (for
          example, cloud drives, email, local storage).
        </li>
        <li>
          The backup is encrypted with a password that you set. We do not know
          this password and cannot decrypt or restore the backup for you.
        </li>
        <li>
          <span className="mb-2">You are responsible for:</span>
          <UnorderedList className="mb-4 ml-10">
            <li>safely storing the backup file;</li>
            <li>remembering the backup password;</li>
            <li>deciding where to keep or share the backup.</li>
          </UnorderedList>
        </li>
      </UnorderedList>
      <Text className="mb-2">
        <strong>3. Our servers</strong>
      </Text>
      <Text className="mb-2">
        Our servers store only limited account-related and technical data,
        specifically:
      </Text>
      <UnorderedList className="mb-4">
        <li>
          <span className="mb-2">Account data:</span>
          <UnorderedList className="mb-4 ml-10">
            <li>name or nickname (if provided);</li>
            <li>email address (if used/verified);</li>
            <li>id from Google (if you sign in via Google);</li>
          </UnorderedList>
        </li>
        <li>
          <span className="mb-2">Subscription/plan data:</span>
          <UnorderedList className="mb-4 ml-10">
            <li>current plan / subscription status;</li>
            <li>
              basic info needed to restore purchases (store
              receipts/tokens/identifiers from App Store / Google Play);
            </li>
          </UnorderedList>
        </li>
        <li>
          <span className="mb-2">Payment / billing history:</span>
          <UnorderedList className="mb-4 ml-10">
            <li>
              records required to verify subscriptions, handle refunds/disputes,
              and comply with legal/accounting obligations;
            </li>
          </UnorderedList>
        </li>
        <li>
          <span className="mb-2">Technical and analytics data:</span>
          <UnorderedList className="mb-4 ml-10">
            <li>
              event logs (for example: app actions, errors, performance
              metrics);
            </li>
            <li>
              device/OS/app version, timestamps, IP address (for security and
              diagnostics);
            </li>
            <li>
              high-level analytics about how features are used (in aggregate).
            </li>
          </UnorderedList>
        </li>
      </UnorderedList>
      <Text className="mb-2">
        We do not store your journal entries (text or images) in our server
        database.
      </Text>
      <Title className="mb-2" level={3}>
        How AI processing works
      </Title>
      <Text className="mb-2">
        When you use AI features (AI comments, analysis, chat, “ask anything”):
      </Text>
      <UnorderedList className="mb-4">
        <li>
          Your device selects the current entry and, if needed, similar/related
          entries from the local encrypted database.
        </li>
        <li>
          A context (prompt) is built locally from these entries and
          user-specific memory.
        </li>
        <li>
          This context is sent to our backend and then forwarded to one or more
          third-party AI providers to generate a response.
        </li>
        <li>
          We do not send payment tokens, subscription identifiers, or your email
          / Google ID as part of the AI prompt.
        </li>
        <li>
          Where possible, we configure AI providers not to use submitted content
          for training their models beyond providing the service.
        </li>
      </UnorderedList>
      <Text className="mb-2">
        We may store limited technical metadata about AI requests (e.g.
        timestamps, token counts, error codes) for billing, abuse prevention,
        and diagnostics.
      </Text>
      <Title className="mb-2" level={3}>
        How we use server-side data
      </Title>
      <Text className="mb-2">
        We use the server-side data described above to:
      </Text>
      <UnorderedList className="mb-4">
        <li>create and manage user accounts;</li>
        <li>
          provide and verify subscriptions, restore purchases, and handle
          refunds/disputes;
        </li>
        <li>secure the Service, detect abuse, and debug issues;</li>
        <li>
          understand overall feature usage in aggregate (without reading your
          journal content);
        </li>
        <li>
          send essential service communications (e.g. email verification,
          security notices).
        </li>
      </UnorderedList>
      <Text className="mb-2">
        We do not use your journal entries for advertising. We do not sell
        personal data.
      </Text>
      <Title className="mb-2" level={3}>
        Retention
      </Title>
      <UnorderedList className="mb-1">
        <li>
          Local journal data (entries, images, AI dialogs, local memory) remains
          on your device until you delete entries, delete the app, or overwrite
          the local database (for example, by restoring another backup). We do
          not control this storage.
        </li>
        <li>
          Account and subscription data on our servers is kept while your
          account exists and as long as necessary for billing, security, and
          legal obligations.
        </li>
        <li>
          Technical logs are typically kept for up to 30 days with regular
          cleanup. Push.
        </li>
        <li>Server-side database backups may be kept for up to 30 days.</li>
        <li>
          Payment and subscription records may be kept longer in de-identified
          or pseudonymised form if required by law or for dispute handling.
        </li>
      </UnorderedList>
      <Title className="mb-2" level={3}>
        Deletion and inactivity
      </Title>
      <Text className="mb-2">You can request deletion of your account:</Text>
      <UnorderedList className="mb-1">
        <li>in the app (Settings → Profile → Delete account), or</li>
        <li>via a link provided on our website.</li>
      </UnorderedList>
      <Text className="mb-2">When an account is deleted:</Text>
      <UnorderedList className="mb-1">
        <li>
          account identifiers, name, email, and Google ID (if any) are deleted
          or de-identified;
        </li>
        <li>
          subscription and payment records are retained only as needed for
          legal/accounting purposes, without an active link back to your profile
          where possible;
        </li>
        <li>logs are removed according to the retention period above.</li>
      </UnorderedList>
      <Text className="mb-2">Automatic deletion for inactive accounts:</Text>
      <Text className="mb-2">
        If an account has no active subscription and there is no activity for 90
        days, we may delete the account and associated server-side data as
        described above.
      </Text>
      <Text className="mb-2">
        If a subscription remains active (for example, the user continues to
        pay), we do not automatically delete the account solely due to
        inactivity.
      </Text>
      <Text className="mb-2">
        Deleting your account does not automatically delete local journal data
        or backup files stored by you. To remove them, you must delete entries
        and/or uninstall the app and delete any backup files you created.
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
        Security
      </Title>
      <Text className="mb-1">
        We use technical and organisational measures to protect data, including:
      </Text>
      <UnorderedList className="mb-1">
        <li>
          encryption in transit (TLS) between the app, our servers, and AI
          providers;
        </li>
        <li>
          encryption of the local journal database on your device, with keys
          stored in OS-level secure storage;
        </li>
        <li>
          access controls and least-privilege permissions on server
          infrastructure;
        </li>
        <li>
          logging and monitoring for security-relevant events, with limited
          retention.
        </li>
      </UnorderedList>
      <Text className="mb-4">
        No system can be guaranteed 100% secure, but we aim to follow industry
        best practices.
      </Text>
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
