"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostService = exports.updatePostService = exports.createPostService = exports.getPostsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getPostsService = async () => {
    return prisma_1.default.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: true },
    });
};
exports.getPostsService = getPostsService;
const createPostService = async (title, content, userId) => {
    return prisma_1.default.post.create({
        data: { title, content, authorId: userId },
    });
};
exports.createPostService = createPostService;
const updatePostService = async (id, title, content, userId) => {
    const post = await prisma_1.default.post.findUnique({ where: { id } });
    if (!post || post.authorId !== userId)
        throw new Error("Unauthorized");
    return prisma_1.default.post.update({
        where: { id },
        data: { title, content },
    });
};
exports.updatePostService = updatePostService;
const deletePostService = async (id, userId) => {
    const post = await prisma_1.default.post.findUnique({ where: { id } });
    if (!post || post.authorId !== userId)
        throw new Error("Unauthorized");
    return prisma_1.default.post.delete({ where: { id } });
};
exports.deletePostService = deletePostService;
