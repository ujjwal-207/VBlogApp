"use client"
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import BlogLoading from "./Loading";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { token, user, logout, checkAuth, isInitialized } = useAuth();
  
  useEffect(() => {
    if(!isInitialized){
    checkAuth();}
  }, [checkAuth, isInitialized]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VBlog
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
<div suppressHydrationWarning>
              {isInitialized ? (
                
                token ? (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium"
                  >
                    Login
                  </Link>
                )
              ) : (
                <BlogLoading/>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
