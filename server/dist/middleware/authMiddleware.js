"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader === null || authHeader === undefined) {
            res.status(401).json({ status: 401, message: 'UnAuthorized' });
            return;
        }
        const token = authHeader.split(" ")[1];
        // verify token 
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Invalid or expired token' });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.authMiddleware = authMiddleware;
