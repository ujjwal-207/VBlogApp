import prisma from "../../prisma";

export const getPostsService = async () => {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
};

export const createPostService = async (
  title: string,
  content: string,
  userId: number
) => {
  return prisma.post.create({
    data: { title, content, authorId: userId },
  });
};

export const updatePostService = async (
  id: number,
  title: string,
  content: string,
  userId: number
) => {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post || post.authorId !== userId) throw new Error("Unauthorized");

  return prisma.post.update({
    where: { id },
    data: { title, content },
  });
};

export const deletePostService = async (id: number, userId: number) => {
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post || post.authorId !== userId) throw new Error("Unauthorized");

  return prisma.post.delete({ where: { id } });
};

