'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import type { InferType } from 'yup'
import Text from '@/components/static/Text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

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
}: {
  email: string
}) {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const initialValues: FormValues = { code: '' }

  function mapStatusToMessage(d: VerifyDeleteCodeResult): string | null {
    switch (d.status) {
      case 'OK':
        return null
      case 'INVALID':
        return 'Incorrect code.'
      case 'EXPIRED':
        return 'The code has expired. Request a new code.'
      case 'ATTEMPTS_EXCEEDED':
        return 'The limit of attempts has been exceeded. Please request a new code later.'
      case 'RATE_LIMITED':
        return 'Too many requests. Please try again later.'
      default:
        return 'An error has occurred. Please try again.'
    }
  }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    console.log(values)
    setServerError(null)
    try {
      const res = await fetch(
        '/api/users/delete-account-by-verification-code',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email,
            code: values.code,
          }),
        },
      )

      if (!res.ok) {
        throw new Error(res?.statusText || 'Send code failed')
      }

      const data = (await res.json()) as VerifyDeleteCodeResult

      const msg = mapStatusToMessage(data)
      if (data.status === 'OK') {
        setIsSuccess(true)
        setServerError(null)
        resetForm()
      } else {
        setIsSuccess(false)
        setServerError(msg)
        resetForm()
      }
    } catch (e: any) {
      setIsSuccess(false)
      setServerError(e.message)
      resetForm()
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

            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}
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
