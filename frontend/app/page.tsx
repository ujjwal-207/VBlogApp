"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="p-2 bg-black text-white rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

