import { Request, Response } from "express";
import { registerService, loginService } from "./auth.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerService(name, email, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

