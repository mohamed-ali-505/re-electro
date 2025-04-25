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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function CorporateLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter()

  // const [formData, setFormData] = useState({
  //   name: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  // })

  const form = useForm()

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target
  //   setFormData((prev) => ({ ...prev, [name]: value }))
  // }

  // const onSubmit = async (data: any) => {
  //   // e.preventDefault();  // Prevent form default submit action
  //   console.log(data)
  //   setIsSubmitting(true);  // Show loading state
  //   // Prepare the data to be sent in the POST user
  //   const userData = {
  //     name: formData.name,
  //     email: formData.email,
  //     phone: formData.phone,
  //     password: formData.password
  //   };

  //   try {
  //     // Send the POST user using Axios
  //     const response = await axios.post("/api/createUser", userData);

  //     // Handle success (you can update the UI or show a success message)
  //     console.log("user created:", response.data);
  //     toast.success("user created successfully!");
  //     setIsSubmitting(false)
  //     // Reset form fields after successful submission
  //     setFormData({
  //       name: "",
  //       phone: "",
  //       email: "",
  //       password: ""
  //     })
  //   } catch (error) {
  //     setIsSubmitting(false);
  //     if (axios.isAxiosError(error)) {
  //       const errorMessage = error.response?.data?.error || "An unknown error occurred";
  //       toast.error(errorMessage.toString());
  //     } else {
  //       console.error("Unexpected error:", error);
  //       toast.error("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  const onSubmit = async (data: any) => {
    setErrorMessage(null);

    if (!data.email || !data.password) {
      // Handle validation error
      console.error('Email and password are required');
      return;

    }

    setIsSubmitting(true)
    try {
      // Call NextAuth's signIn function with credentials
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email: data.email,
        password: data.password,
      });


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
      } else {
        setIsSubmitting(false)
        router.refresh();
        router.replace('/');
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error:', error);
      // setErrorMessage('Unexpected error occurred. Please try again.'); // Display general error
    }
  };

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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Forgot your password?
            </Link>
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

