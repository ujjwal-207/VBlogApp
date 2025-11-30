"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const registerService = async (name, email, password) => {
    const exists = await prisma_1.default.user.findUnique({ where: { email } });
    if (exists)
        throw new Error("User already exists");
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: { name, email, password: hashed },
    });
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    return { user, token };
};
exports.registerService = registerService;
const loginService = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await bcryptjs_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    return { user, token };
};
exports.loginService = loginService;
