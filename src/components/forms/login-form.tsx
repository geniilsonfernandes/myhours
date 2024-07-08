"use client";

import { loginAction } from "@/actions/auth/mutations";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await loginAction({
        email: "j@j.com",
        password: "123",
      });

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center rounded-md border border-gray-200 p-3"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="mx-2 rounded border border-gray-500"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="mx-2 rounded border border-gray-500"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="mt-4 flex w-36 items-center justify-center rounded bg-orange-300"
        >
          Ceredential Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
