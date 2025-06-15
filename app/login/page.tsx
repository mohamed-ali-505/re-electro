"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
// import axios from 'axios'
// import { toast } from 'sonner'
import { useState } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import InputForm from '@/components/form/Input-form'
// import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthProvider'

export default function CorporateLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter()
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [verificationInput, setVerificationInput] = useState("")
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [verifyLoading, setVerifyLoading] = useState(false);
  const form = useForm()
  const context = useAuth()

  const onSubmit = async (data: any) => {
    setErrorMessage(null);

    if (!data.email || !data.password) {
      // Handle validation error
      console.error('Email and password are required');
      return;

    }

    setIsSubmitting(true)
    // ...existing code...

    try {
      // Call NextAuth's signIn function with credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      let result: { error?: string, data?: { id: string, role: string } } = {};
      if (response.headers.get('content-type')?.includes('application/json')) {
        result = await response.json();
      }

      console.log(result);

      if (result?.error) {
        setIsSubmitting(false)
        // If there's an error, update the error message state
        const errors = JSON.parse(result.error)
        if (errors.email) {
          form.setError("email", { type: "manual", message: errors.email });
        }
        if (errors.password) {
          form.setError("password", { type: "manual", message: errors.password });
        }
        if (errors.isActive) {
          setErrorMessage(errors.isActive);
        }
        if (errors.notAllow) {
          setErrorMessage(errors.notAllow);
        }
        if (errors.notVerified) {
          // If the backend returns a notVerified error, show the dialog
          setShowVerifyDialog(true)
        }
      } else {
        setIsSubmitting(false)
        if (result.data) {
          context?.setSession({
            id: result.data.id,
            role: result.data.role,
          });
          router.refresh();
          router.replace('/');
        }
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error:', error);
      // setErrorMessage('Unexpected error occurred. Please try again.'); // Display general error
    }
    // ...existing code...
  };

  // Handler for verification input submission
  const handleVerify = async () => {
    setVerifyError(null);
    setResendMessage(null);
    setVerifyLoading(true);

    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.getValues('email'),
          otp: verificationInput,
        }),
      });

      if (res.ok) {
        // Optionally, you can close the dialog and show a success message or log the user in
        setShowVerifyDialog(false);
        // Optionally, you can show a toast or redirect
        // router.replace('/profile') or router.refresh();
      } else {
        const data = await res.json();
        setVerifyError(data.error || 'Invalid verification code');
      }
    } catch (err) {
      console.error('Failed to verify code:', err)
      setVerifyError('Failed to verify code. Please try again.');
    }

    setVerifyLoading(false);
  };

  // Handler for resending verification code
  const handleResendCode = async () => {
    setResendLoading(true)
    setResendMessage(null)
    setVerifyError(null)
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.getValues('email') }),
      })
      if (res.ok) {
        setResendMessage('Verification code sent!')
      } else {
        const data = await res.json()
        setVerifyError(data.error || 'Failed to resend code')
      }
    } catch (error) {
      console.error('Failed to resend code:', error)
      setVerifyError('Failed to resend code')
    }
    setResendLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Corporate Login</CardTitle>
            <CardDescription>
              Access your corporate recycling dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <InputForm
                  control={form.control}
                  name="email"
                  className="w-full"
                  label="email"
                  rules={{ required: true }}
                  placeholder="company@example.com"
                />
                <InputForm
                  control={form.control}
                  name="password"
                  className="w-full"
                  label="password"
                  placeholder="********"
                  type="password"
                  rules={{ required: true }}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign in"}
                </Button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </form>
            </Form>
            {/* <form className="space-y-4" action="#">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="company@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>

            </form> */}
            {/* Dialog for email verification */}
            {showVerifyDialog && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                  <h2 className="text-lg font-bold mb-2">Email Not Verified</h2>
                  <p className="mb-4">Please enter the verification code sent to your email.</p>
                  <input
                    type="text"
                    className="border p-2 w-full mb-2"
                    placeholder="Verification code"
                    value={verificationInput}
                    onChange={e => setVerificationInput(e.target.value)}
                  />
                  {verifyError && <p className="text-red-500">{verifyError}</p>}
                  {resendMessage && <p className="text-green-600">{resendMessage}</p>}
                  <div className="flex gap-2">
                    <Button onClick={handleVerify} disabled={verifyLoading}>
                      {verifyLoading ? "Verifying..." : "Verify"}
                    </Button>
                    <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>Cancel</Button>
                    <Button
                      variant="secondary"
                      onClick={handleResendCode}
                      disabled={resendLoading}
                    >
                      {resendLoading ? "Resending..." : "Resend Code"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {/* <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Forgot your password?
            </Link> */}
            <div className="text-sm text-gray-500">
              Don't have a corporate account?{' '}
              <Link href="/signup" className="text-green-600 hover:text-green-500">
                Sign up here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

