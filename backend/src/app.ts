import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import postsRoutes from "./modules/posts/posts.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

export default app;

