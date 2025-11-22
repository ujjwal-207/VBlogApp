"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useTheme } from "@/context/ThemeContext";
import { ArrowLeft, FileEdit, Type, FileText, Save } from "lucide-react";
import Link from "next/link";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const { updatePost } = usePosts();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPost = async () => {
    try {
      const data = await apiClient.get(`/posts`);
      const post = data.find((p: any) => p.id === id);

      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    } catch (e) {
      console.error("Failed to load post", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await updatePost(id, title, content);
    router.push("/dashboard");
  };

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg animate-pulse ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-600 to-purple-600"
                : "bg-gradient-to-br from-blue-500 to-purple-500"
            }`}
          >
            <FileEdit size={32} className="text-white" />
          </div>
          <p className={`text-lg font-medium ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}>
            Loading post...
          </p>
        </div>
      </div>
    );

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-600 to-purple-600"
                  : "bg-gradient-to-br from-blue-500 to-purple-500"
              }`}
            >
              <FileEdit size={26} className="text-white" />
            </div>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${
                theme === "dark" 
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" 
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              }`}>
                Edit Post
              </h1>
              <p className={`text-sm mt-1 ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}>
                Update your content
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
              className={`w-full p-4 rounded-xl border-2 focus:ring-4 focus:outline-none transition-all duration-300 text-lg font-medium ${
                theme === "dark"
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="Enter a title..."
              value={title}
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
              rows={12}
              className={`w-full p-4 rounded-xl border-2 resize-none focus:ring-4 focus:outline-none transition-all duration-300 ${
                theme === "dark"
                  ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
              }`}
              placeholder="Update your post content..."
              value={content}
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
            <Save size={20} className="group-hover:scale-110 transition-transform" />
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
