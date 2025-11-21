import { Router } from "express";
import { authMiddleware } from "../../middleware/auth";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./posts.controller";

const router = Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;

