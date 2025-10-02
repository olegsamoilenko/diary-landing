'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import type { InferType } from 'yup'
import Text from '@/components/static/Text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { fetchJSON, HttpError } from '@/lib/http'
import { mapErrorToMessage } from '@/lib/error-map'

const schema = Yup.object({
  code: Yup.string().min(6).max(6).required('Field is required'),
})

type FormValues = InferType<typeof schema>

type VerifyDeleteCodeResult =
  | { status: 'OK' }
  | { status: 'INVALID'; attemptsLeft?: number }
  | { status: 'EXPIRED' }
  | { status: 'ATTEMPTS_EXCEEDED' }
  | { status: 'RATE_LIMITED' }

export default function ConfirmDeletionAccountForm({
  email,
  requestNewCodeAction,
}: {
  email: string
  requestNewCodeAction: () => void
}) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [requestNewCodeButton, setRequestNewCodeButton] = useState(false)

  const initialValues: FormValues = { code: '' }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    setServerError(null)
    setIsSuccess(false)

    try {
      await fetchJSON<VerifyDeleteCodeResult>(
        '/api/users/delete-account-by-verification-code',
        {
          method: 'POST',
          body: JSON.stringify({ email, code: values.code }),
        },
      )

      setIsSuccess(true)
      setServerError(null)
      resetForm()
    } catch (e: unknown) {
      const msg = mapErrorToMessage(e)
      setIsSuccess(false)
      setServerError(msg)

      if (
        e instanceof HttpError &&
        (e.code === 'ATTEMPTS_EXCEEDED' || e.code === 'EXPIRED_CODE')
      ) {
        setRequestNewCodeButton(true)
      }
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <div>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={schema}
        validateOnBlur
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="justify-end space-y-4">
            <Text>
              Paste the code from the email.{' '}
              <span className="text-red-500">Do not reload this page</span>.
            </Text>

            <Input
              id="code"
              name="code"
              type="text"
              maxLength={6}
              minLength={6}
              placeholder="123456"
              className="max-w-[100px] md:max-w-[100px]"
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.code && !!errors.code ? true : undefined}
              aria-describedby={
                touched.code && errors.code ? 'code-error' : undefined
              }
              autoComplete="email"
            />
            {touched.code && errors.code && (
              <p id="code-error" className="text-sm text-red-600">
                {errors.code}
              </p>
            )}

            <div>
              {serverError && (
                <span className="text-sm text-red-600">{serverError}</span>
              )}{' '}
              {requestNewCodeButton && (
                <button
                  className="cursor-pointer text-sm text-red-600 underline"
                  onClick={requestNewCodeAction}
                >
                  Request a new code.
                </button>
              )}
            </div>
            {isSuccess && (
              <p className="text-sm text-green-600">
                You have successfully deleted your account.
              </p>
            )}

            <Button type="submit" disabled={isSubmitting} className="">
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
