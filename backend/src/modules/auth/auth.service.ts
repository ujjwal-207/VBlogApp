import prisma from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerService = async (
  name: string,
  email: string,
  password: string
) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 4);

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  );

  return { user, token };
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!
  );

  return { user, token };
};

