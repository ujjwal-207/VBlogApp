import { create } from "zustand";
import { apiClient } from "@/lib/api";
import { Post } from "@/types/post";

interface PostStore {
  posts: Post[];
  loading: boolean;

  fetchPosts: () => Promise<void>;
  createPost: (title: string, content: string) => Promise<void>;
  updatePost: (id: number, title: string, content: string) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePosts = create<PostStore>((set) => ({
  posts: [],
  loading: false,

  fetchPosts: async () => {
    set({ loading: true });
    const res = await apiClient.get("/posts");
    set({ posts: res, loading: false });
  },

  createPost: async (title, content) => {
    await apiClient.post("/posts", { title, content });
  },

  updatePost: async (id, title, content) => {
    await apiClient.put(`/posts/${id}`, { title, content });
  },

  deletePost: async (id) => {
    await apiClient.delete(`/posts/${id}`);
  },
}));

