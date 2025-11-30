"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const auth_service_1 = require("./auth.service");
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await (0, auth_service_1.registerService)(name, email, password);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await (0, auth_service_1.loginService)(email, password);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.loginController = loginController;
