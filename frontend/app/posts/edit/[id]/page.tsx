"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { useRouter, useParams } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const { updatePost } = usePosts();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch and autofill the post
  const fetchPost = async () => {
    const data = await apiClient.get(`/posts`);
    const post = data.find((p: any) => p.id === id);

    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePost(id, title, content);
    router.push("/dashboard");
  };

  if (loading)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow">
      <h1 className="text-xl font-bold">Edit Post</h1>

      <form onSubmit={submit} className="flex flex-col mt-4 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />

        <button className="bg-black text-white p-2 rounded" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

