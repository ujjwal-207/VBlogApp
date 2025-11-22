"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="p-4 bg-white shadow flex justify-between">
      <Link href="/dashboard" className="font-bold">VBlog</Link>

      {token ? (
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      ) : (
        <Link href="/" className="text-blue-600">Login</Link>
      )}
    </nav>
  );
}

