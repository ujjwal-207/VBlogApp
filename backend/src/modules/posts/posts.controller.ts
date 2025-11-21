import { Request, Response } from "express";
import {
  getPostsService,
  createPostService,
  updatePostService,
  deletePostService,
} from "./posts.service";

export const getPosts = async (req: Request, res: Response) => {
  const posts = await getPostsService();
  res.json(posts);
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await createPostService(title, content, req.user!.id);
    res.json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    const post = await updatePostService(id, title, content, req.user!.id);
    res.json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await deletePostService(id, req.user!.id);
    res.json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

