"use client";

import { useEffect } from "react";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";

export default function Dashboard() {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/posts/create" className="bg-black text-white px-4 py-2 rounded">
          + New
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((p : any) => (
          <Link
            key={p.id}
            href={`/posts/edit/${p.id}`}
            className="block p-3 bg-white rounded shadow"
          >
            <h2 className="font-bold">{p.title}</h2>
            <p className="text-gray-600">{p.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

