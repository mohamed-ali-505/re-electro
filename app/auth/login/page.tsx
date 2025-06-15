"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form"
import InputForm from "@/components/form/Input-form"
import ButtonLoading from "@/components/ui-custom/button-loading"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

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
      // without next-auth
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
      const result = await response.json();
      console.log('data', data);
      if (data.error) {
        toast.error(result.error);
        setLoading(false);
        return;
      }
      router.refresh();
      router.replace('/');

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

