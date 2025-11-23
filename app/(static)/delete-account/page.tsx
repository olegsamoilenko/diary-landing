'use client'
import Container from '@/components/static/Container'
import Title from '@/components/static/Title'
import Text from '@/components/static/Text'
import OrderedList from '@/components/static/OrderedList'
import UnorderedList from '@/components/static/UnorderedList'
import DeleteAccountForm from '@/components/static/delete-account/DeleteAccountForm'
import { useState } from 'react'
import ConfirmDeletionAccountForm from '@/components/static/delete-account/ConfirmDeletionAccountForm'

export default function DeleteAccountPage() {
  const [codeSent, setCodeSent] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <Container className="py-10">
      <Title>Nemory — Account Deletion</Title>
      <Text>Developer: Oleg Samoilenko</Text>
      <Text className="mb-4">App: Nemory</Text>
      <Text className="mb-4">
        Use this page to request deletion of your account and associated
        server-side data.
      </Text>
      <Title level={2} className="mb-2">
        How to delete your account
      </Title>
      <Title className="mb-2" level={3}>
        Option A — In-app (recommended)
      </Title>
      <OrderedList className="mb-4">
        <li>Open the Nemory app on your device.</li>
        <li>Go to the Settings → Profile → Delete account.</li>
        <li>Follow the prompts to confirm account deletion.</li>
      </OrderedList>
      <Title className="mb-2" level={3}>
        Option B — Web request (this page)
      </Title>
      <Text className="mb-2">
        If you can’t access the app, submit the form below and we’ll process
        your request by email.
      </Text>

      <div className="my-6 rounded-md border-l-4 border-gray-500/70 bg-gray-50 py-3 pl-4">
        <Text className="m-0">
          <b className="font-bold">Important:</b>{' '}
          <span>
            Your journal entries (notes, images, AI comments) are stored locally
            on your device in an encrypted database.
          </span>
        </Text>
        <Text className="m-0">
          Deleting your account does not automatically delete local data or
          backup files.
        </Text>
        <Text className="m-0">
          To remove them, uninstall the app and/or delete any backups you
          created.
        </Text>
      </div>
      <Title className="mb-4" level={2}>
        What will be deleted
      </Title>
      <Text className="mb-2">
        For registered accounts (email or Google sign-in), we permanently
        delete:
      </Text>
      <UnorderedList className="mb-4">
        <li>
          Account identifiers: display name, email address, Google account ID
          (if used).
        </li>
        <li>
          Profile & settings: language, basic app preferences, plan information.
        </li>
        <li>Subscription status: active/expired plan flags.</li>
        <li>
          Session & auth data: access/refresh tokens, server-side device/session
          IDs linked to your account.
        </li>
      </UnorderedList>
      <Title className="mb-4" level={3}>
        What we keep after deletion
      </Title>
      <Text className="mb-4">
        After account deletion we may still retain, as described in the Privacy
        Policy:
      </Text>
      <UnorderedList className="mb-4">
        <li>
          Technical logs for a short period (typically up to 30 days) for
          security and diagnostics, after which they are removed.
        </li>
        <li>
          Payment and subscription records as required by law (billing, tax,
          disputes/refunds), typically with the user reference removed or
          pseudonymised where possible.
        </li>
        <li>
          Aggregate, anonymous statistics that cannot reasonably be linked back
          to you.
        </li>
      </UnorderedList>
      <Text className="mb-4">
        We do not keep a server-side copy of your journal entries.
      </Text>
      <Title className="mb-4" level={3}>
        Data security
      </Title>
      <UnorderedList className="mb-4">
        <li>
          In transit: data sent between the app, our servers, and AI providers
          is protected with HTTPS (TLS).
        </li>
        <li>
          On device: your journal database is stored encrypted on your device.
        </li>
        <li>
          On our servers: limited account, subscription, and log data is stored
          in databases protected with access controls and encryption (for
          example, KMS-managed keys).
        </li>
      </UnorderedList>
      <Text className="mb-4">
        Once deletion is confirmed, account-related data is removed from our
        production systems as described above.
      </Text>
      <Title className="mb-4" level={2}>
        Deletion request form
      </Title>
      <div className="mb-4">
        {codeSent ? (
          <div>
            <ConfirmDeletionAccountForm
              email={email}
              requestNewCodeAction={() => setCodeSent(false)}
            />
            <Text className="mt-2 mb-4">
              Did not receive the code?{' '}
              <button
                className="cursor-pointer underline"
                onClick={() => setCodeSent(false)}
              >
                Try again
              </button>
            </Text>
          </div>
        ) : (
          <DeleteAccountForm
            setEmailAction={setEmail}
            onSuccessAction={() => setCodeSent(true)}
          />
        )}
      </div>
      <Title className="mb-4" level={3}>
        Contact
      </Title>
      <Text className="mb-4">
        If you have questions about deletion or privacy, contact us at{'  '}
        <a href="mailto:nemoryai.diary@gmail.com" className="underline">
          nemoryai.diary@gmail.com
        </a>
      </Text>
    </Container>
  )
}
