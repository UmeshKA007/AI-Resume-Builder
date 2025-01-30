"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.loginController = exports.signUpController = void 0;
const db_1 = __importDefault(require("../config/db"));
const userSchema_1 = require("../validations/userSchema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const validation = userSchema_1.signupSchema.safeParse(body);
        if (!validation.success) {
            const errorMsg = validation.error.errors[0].message;
            response.status(400).json({ message: errorMsg });
            return;
        }
        // Check if user already exists
        const user = yield db_1.default.user.findUnique({ where: { email: body.email } });
        if (user) {
            response.status(401).json({ error: "User already exists. Try a different email." });
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(body.password, 10);
        const createUser = yield db_1.default.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: createUser.id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        response.status(201).json({
            message: "User created successfully",
            createUser,
            token,
        });
        return;
    }
    catch (error) {
        console.error("Error in signUpController:", error);
        response.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.signUpController = signUpController;
const loginController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const validation = userSchema_1.loginSchema.safeParse(body);
        if (!validation.success) {
            const errorMsg = validation.error.errors[0].message;
            response.status(400).json({ message: errorMsg });
            return;
        }
        const user = yield db_1.default.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            response.status(401).json({ error: 'Invalid Email and Password' });
            return;
        }
        const isCorrectPassword = yield bcryptjs_1.default.compare(body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isCorrectPassword) {
            response.status(401).json({ error: 'Invalid Email and Password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        response.status(201).json({
            message: "User Logged in Successfully",
            token,
        });
        return;
    }
    catch (error) {
        console.error("Error in loginController:", error);
        response.status(500).json({ message: "Internal Server Error" });
        return;
    }
});
exports.loginController = loginController;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const loggedInUser = yield db_1.default.user.findUnique({ where: {
                id: userId
            } });
        res.json(loggedInUser);
    }
    catch (error) {
    }
});
exports.currentUser = currentUser;
