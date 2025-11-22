"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Loader2, Mail, Lock, User } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const ok = await registerUser(data.name, data.email, data.password);

    if (ok) router.push("/dashboard");
    else {
      setError("root", { message: "Registration failed. Try again." });
    }

    setIsLoading(false);
  };

  return (
    <div
      className={`h-screen w-full flex overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="/educate-users.png"
          alt="Register Visual"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VBlog
              </h1>
            </Link>

            <h2
              className={`mt-6 text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Create your account
            </h2>

            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                href="/"
                className={`font-medium ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                } hover:underline`}
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            {errors.root && (
              <div
                className={`rounded-lg p-4 text-sm border ${
                  theme === "dark"
                    ? "bg-red-900/20 text-red-400 border-red-800"
                    : "bg-red-50 text-red-800 border-red-200"
                }`}
              >
                {errors.root.message}
              </div>
            )}

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("name")}
                  placeholder="John Doe"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
                  } ${errors.name ? "border-red-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("email")}
                  placeholder="JohnDoe@abc.abc"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
                  } ${errors.name ? "border-red-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("password")}
                  placeholder="********"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    theme === "dark"
                      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                      : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
                  } ${errors.name ? "border-red-500" : ""}`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full flex justify-center py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

