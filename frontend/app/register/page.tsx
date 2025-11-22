"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await register(name, email, password);
    if (ok) router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="p-2 bg-black text-white rounded" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

