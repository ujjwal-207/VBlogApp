"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const login = useAuth((state) => state.login);
  const { theme } = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const ok = await login(data.email, data.password);
      if (ok) {
        router.push("/dashboard");
      } else {
        setError("root", {
          message: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
  <div
    className={`min-h-screen w-full flex overflow-hidden ${
      theme === "dark" ? "bg-gray-900" : "bg-gray-50"
    }`}
  >
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <img
        src="/blog.jpg"
        alt="Login Visual"
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
            Sign in to your account
          </h2>

          <p
            className={`mt-2 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Or{" "}
            <Link
              href="/register"
              className={`font-medium ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              } hover:underline`}
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="space-y-6 overflow-hidden">
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
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                {...register("email")}
                id="email"
                type="email"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
                } ${errors.email ? "border-red-500" : ""}`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
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
                id="password"
                type={showPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
                } ${errors.password ? "border-red-500" : ""}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded" />
              <span
                className={
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }
              >
                Remember me
              </span>
            </label>
            <Link
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </Link>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full flex justify-center py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
