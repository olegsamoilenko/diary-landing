'use client'

import { useState } from 'react'
import Text from '@/components/static/Text'
import DeleteAccountForm from '@/components/static/delete-account/DeleteAccountForm'
import ConfirmDeletionAccountForm from '@/components/static/delete-account/ConfirmDeletionAccountForm'

export default function DeleteAccountPageClient() {
  const [codeSent, setCodeSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
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
  )
}
