"use server";

import LoginForm from "@/components/forms/login-form";

export default async function LoginPage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}
