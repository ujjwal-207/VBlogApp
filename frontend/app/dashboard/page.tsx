"use client";

import { useEffect, useState, useMemo } from "react";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Plus, FileText, Trash2, X, Sparkles, Search, Filter } from "lucide-react";
import SortDropdown from "@/components/SortDropdown"; 

export default function Dashboard() {
  const { posts, fetchPosts, deletePost } = usePosts();
  const { theme } = useTheme();

  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [sortKey, setSortKey] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleSortChange = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const categories = useMemo(() => {
    if (Array.isArray(posts)) {
        const allCategories = posts.map((p: any) => p.category).filter(Boolean);
        return ["all", ...Array.from(new Set(allCategories))];
    }
    return ["all"];
  }, [posts]);


  const filteredAndSortedPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];

    const filtered = posts.filter((post: any) => {
      const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
      const searchLower = searchTerm.toLowerCase();
      const searchMatch = post.title.toLowerCase().includes(searchLower) ||
                          post.content.toLowerCase().includes(searchLower);
      return categoryMatch && searchMatch;
    });
    const sorted = [...filtered].sort((a: any, b: any) => {
      let comparison = 0;
      if (sortKey === "title") {
        const titleA = a.title.toUpperCase(); 
        const titleB = b.title.toUpperCase(); 
        if (titleA > titleB) comparison = 1;
        if (titleA < titleB) comparison = -1;
      } 
      
      else if (sortKey === "date") {
        const dateA = new Date(a.date || a.createdAt || 0).getTime();
        const dateB = new Date(b.date || b.createdAt || 0).getTime();
        comparison = dateA - dateB;
      }
      return sortDirection === "asc" ? comparison : comparison * -1;
    });
    
    return sorted;
  }, [posts, searchTerm, selectedCategory, sortKey, sortDirection]); 

  const openDelete = (post: any) => {
    setSelectedPost(post);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedPost) return;
    await deletePost(selectedPost.id);
    fetchPosts(); 
    setShowConfirm(false);
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div
      className={`min-h-screen px-4 md:px-8 py-8 transition-all duration-300 ${
        theme === "dark" 
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${
              theme === "dark" 
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" 
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            }`}>
              Dashboard
            </h1>
            <p className={`text-sm ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}>
              Manage your blog posts
            </p>
          </div>

          <Link
            href="/posts/create"
            className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/50"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/30"
            }`}
          >
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            New Post
          </Link>
        </div>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative flex-1 col-span-1 md:col-span-1">
            <Search size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              theme === "dark" ? "text-slate-400" : "text-gray-400"
            }`} />
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-3 pl-12 pr-4 rounded-xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-700/80 text-white border border-slate-700 placeholder-slate-400"
                  : "bg-white border border-gray-200 placeholder-gray-500"
              }`}
            />
          </div>

          <div className="relative col-span-1 md:col-span-1">
            <Filter size={20} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              theme === "dark" ? "text-slate-400" : "text-gray-400"
            }`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`appearance-none w-full py-3 pl-12 pr-10 rounded-xl shadow-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === "dark"
                  ? "bg-slate-700/80 text-white border border-slate-700"
                  : "bg-white border border-gray-200 text-gray-700"
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>
            <svg
              className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 ${
                theme === "dark" ? "text-slate-400" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* <div className="col-span-1 md:col-span-1"> */}
          {/*   <SortDropdown */}
          {/*       currentSortKey={sortKey} */}
          {/*       currentSortDirection={sortDirection} */}
          {/*       onSortChange={handleSortChange} */}
          {/*   /> */}
          {/* </div> */}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedPosts.map((p: any) => (
            <div
              key={p.id}
              className={`group relative p-6 rounded-2xl shadow-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                theme === "dark"
                  ? "bg-slate-800/80 border-slate-700/50 hover:border-purple-500/50"
                  : "bg-white/90 border-gray-200 hover:border-purple-400/50"
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                  : "bg-gradient-to-br from-blue-50 to-purple-50"
              }`} />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                        : "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                    }`}
                  >
                    <FileText size={26} />
                  </div>

                  <button
                    onClick={() => openDelete(p)}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                      theme === "dark"
                        ? "hover:bg-red-500/20 text-red-400 hover:text-red-300"
                        : "hover:bg-red-50 text-red-500 hover:text-red-600"
                    }`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <Link href={`/posts/edit/${p.id}`}>
                  <h2
                    className={`text-xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {p.title}
                  </h2>

                  <p
                    className={`text-sm line-clamp-3 leading-relaxed ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {p.content.slice(0, 120)}...
                  </p>
                </Link>
                {p.category && (
                    <span className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full ${
                        theme === "dark" 
                            ? "bg-purple-500/20 text-purple-300" 
                            : "bg-purple-100 text-purple-600"
                    }`}>
                        {capitalize(p.category)}
                    </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {filteredAndSortedPosts.length === 0 && (
          <div className={`mt-32 text-center ${
            theme === "dark" ? "text-slate-400" : "text-gray-500"
          }`}>
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              theme === "dark" 
                ? "bg-gradient-to-br from-slate-700 to-slate-800" 
                : "bg-gradient-to-br from-gray-100 to-gray-200"
            }`}>
              <FileText size={40} className="opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
                {posts.length === 0 
                    ? "No posts yet" 
                    : "No matching posts found"
                }
            </h3>
            <p className="text-lg">
                {posts.length === 0 
                    ? "Create your first post to get started!" 
                    : "Try adjusting your search, filter, or sort options."
                }
            </p>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md px-4 animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border transform transition-all ${
              theme === "dark" 
                ? "bg-slate-800/95 border-slate-700/50 text-white" 
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-bold ${
                theme === "dark"
                  ? "bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
              }`}>
                Delete Post?
              </h3>
              <button 
                onClick={() => setShowConfirm(false)}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  theme === "dark"
                    ? "hover:bg-slate-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <X size={22} />
              </button>
            </div>

            <p className={`mb-8 leading-relaxed ${
              theme === "dark" ? "text-slate-300" : "text-gray-600"
            }`}>
              Are you sure you want to delete{" "}
              <span className={`font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                "{selectedPost?.title}"
              </span>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className={`px-6 py-3 rounded-xl font-semibold border transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "border-slate-600 hover:bg-slate-700 text-slate-300"
                    : "border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
