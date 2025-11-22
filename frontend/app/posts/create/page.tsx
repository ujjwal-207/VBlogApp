"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { createPost } = usePosts();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    await createPost(title, content);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow">
      <h1 className="text-xl font-bold">Create Post</h1>

      <form onSubmit={submit} className="flex flex-col mt-4 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
        <button className="bg-black text-white p-2 rounded" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

