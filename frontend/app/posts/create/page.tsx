"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ArrowLeft, Sparkles, FileText, Type } from "lucide-react";
import Link from "next/link";

export default function CreatePost() {
  const { createPost } = usePosts();
  const router = useRouter();
  const { theme } = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    const ok = await createPost(title, content);
    router.push("/dashboard");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-start md:items-center px-4 py-10 transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl p-8 md:p-10 border backdrop-blur-sm transition-all ${
          theme === "dark" 
            ? "bg-slate-800/80 border-slate-700/50" 
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-600 to-purple-600"
                  : "bg-gradient-to-br from-blue-500 to-purple-500"
              }`}
            >
              <Sparkles size={26} className="text-white" />
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" 
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              }`}>
                Create Post
              </h1>
              <p className={`text-sm mt-1 ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}>
                Share your thoughts with the world
              </p>
            </div>
          </div>

          <Link
            href="/dashboard"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "border-slate-600 hover:bg-slate-700 text-slate-300"
                : "border-gray-300 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-6 mt-6">
          <div className="relative">
            <label
              className={`flex items-center gap-2 mb-3 text-sm font-semibold ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              <Type size={18} />
              Title
            </label>
            <input
              value={title}
              className={`w-full p-4 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium ${
                theme === "dark"
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="Enter an engaging title..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="relative">
            <label
              className={`flex items-center gap-2 mb-3 text-sm font-semibold ${
                theme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
            >
              <FileText size={18} />
              Content
            </label>
            <textarea
              value={content}
              rows={12}
              className={`w-full p-4 rounded-xl border-2 resize-none focus:ring-4 focus:outline-none transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="Start writing your story..."
              onChange={(e) => setContent(e.target.value)}
            />
            <div className={`mt-2 text-xs ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}>
              {content.length} characters
            </div>
          </div>
          <button
            type="submit"
            className={`group relative mt-4 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/50"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-blue-500/30"
            }`}
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
