"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form"
import InputForm from "@/components/form/Input-form"
import ButtonLoading from "@/components/ui-custom/button-loading"

export default function Login() {
  const [loading, setLoading] = useState(false)

  const form = useForm()

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);

    if (!data.email || !data.password) {
      // Handle validation error
      console.error('Email and password are required');
      return;

    }

    setLoading(true)
    try {
      // Call NextAuth's signIn function with credentials
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email: data.email,
        password: data.password,
      });

      console.log('Login result:', result);



      // if (result?.error) {
      //   setLoading(false)
      //   // If there's an error, update the error message state
      //   const errors = JSON.parse(result.error)
      //   if (errors.email) {
      //     setError("email", { type: "manual", message: errors.email });
      //   }
      //   if (errors.password) {
      //     setError("password", { type: "manual", message: errors.password });
      //   }
      //   if (errors.isActive) {
      //     setErrorMessage(errors.isActive);
      //   }
      // } else {
      //   setLoading(false)
      //   router.refresh();
      //   router.replace('/');
      // }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Unexpected error:', error);
      // setErrorMessage('Unexpected error occurred. Please try again.'); // Display general error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Access your ReElectro account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <InputForm
                control={form.control}
                name="justification"
                className="w-full"
                label="Justification"
                rules={{ required: true }}
                placeholder="Enter Justification"
              />
              <InputForm
                control={form.control}
                name="justificationAr"
                className="w-full"
                label="Justification Arabic"
                placeholder="Enter Justification Arabic"
                rules={{ required: true }}
              />
              <ButtonLoading
                type="submit"
                loading={loading}
              >
                {"Login"}
              </ButtonLoading>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div >
  )
}

