"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const posts_service_1 = require("./posts.service");
const getPosts = async (req, res) => {
    const posts = await (0, posts_service_1.getPostsService)();
    res.json(posts);
};
exports.getPosts = getPosts;
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await (0, posts_service_1.createPostService)(title, content, req.user.id);
        res.json(post);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, content } = req.body;
        const post = await (0, posts_service_1.updatePostService)(id, title, content, req.user.id);
        res.json(post);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const post = await (0, posts_service_1.deletePostService)(id, req.user.id);
        res.json(post);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deletePost = deletePost;
