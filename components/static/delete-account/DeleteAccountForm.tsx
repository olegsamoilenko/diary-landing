'use client'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import type { InferType } from 'yup'
import Text from '@/components/static/Text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Field is required'),
})

type FormValues = InferType<typeof schema>

export default function DeleteAccountForm({
  setEmail,
  onSuccessAction,
}: {
  setEmail: (email: string) => void
  onSuccessAction: () => void
}) {
  const initialValues: FormValues = { email: '' }

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const res = await fetch('/api/users/send-verification-code-for-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error(res?.statusText || 'Send email failed')
      }
      setEmail(values.email)
      onSuccessAction()
      resetForm()
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : typeof e === 'string'
            ? e
            : 'Unknown error'
      console.log('error', msg)
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
              Enter your email. If an account exists, we sent a code to delete
              account.
            </Text>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
              className="max-w-[300px] md:max-w-[400px]"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.email && !!errors.email ? true : undefined}
              aria-describedby={
                touched.email && errors.email ? 'email-error' : undefined
              }
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-red-600">
                {errors.email}
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
