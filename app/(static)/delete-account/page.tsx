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
        Use this page to request deletion of your account and all associated
        data.
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
        If you can’t access the app, submit the form below.
      </Text>

      <div className="my-6 rounded-md border-l-4 border-gray-500/70 bg-gray-50 py-3 pl-4">
        <Text className="m-0">
          <span className="font-medium">Note:</span> Anonymous use (no sign-in)
          cannot be manually deleted; see{' '}
          <span className="font-bold">Anonymous use</span> below.
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
          Profile & settings: app preferences, language, plan, feature flags.
        </li>
        <li>
          Content you created: notes/entries, moods, AI comments/threads,
          attachments (including uploaded images).
        </li>
        <li>
          Session & auth data: access tokens, refresh tokens, device/session IDs
          linked to your account.
        </li>
      </UnorderedList>
      <Title className="mb-4" level={3}>
        What we keep after deletion
      </Title>
      <Text className="mb-4">
        We do not retain any personal data after account deletion. Anonymous,
        aggregated metrics that cannot identify you may be retained for app
        quality (if collected).
      </Text>
      <Title className="mb-4" level={3}>
        Anonymous use (no registration)
      </Title>
      <Text className="mb-4">
        When you use Nemory without registration, we create a random UUID and
        store only:
      </Text>
      <UnorderedList className="mb-4">
        <li>your chosen display name (can be anything), and</li>
        <li>the UUID to operate your session.</li>
      </UnorderedList>
      <Text>
        There is no manual deletion for anonymous sessions because we cannot
        verify ownership.
      </Text>
      <Text className="mb-4">
        Anonymous sessions are automatically purged after 90 days of inactivity.
      </Text>
      <Title className="mb-4" level={3}>
        Data security
      </Title>
      <UnorderedList className="mb-4">
        <li>Data in transit: protected with HTTPS (TLS).</li>
        <li>Data at rest (server): encrypted using KMS-managed keys.</li>
        <li>
          Once deletion is confirmed, related personal data is removed from our
          production systems.
        </li>
      </UnorderedList>
      <Title className="mb-4" level={2}>
        Deletion request form
      </Title>
      <div className="mb-4">
        {codeSent ? (
          <div>
            <ConfirmDeletionAccountForm
              email={email}
              requestNewCode={() => setCodeSent(false)}
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
            setEmail={setEmail}
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
