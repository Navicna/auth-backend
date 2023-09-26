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
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../lib/prisma"));
// import bcrypt from 'bcrypt'
function register(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/register", (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const bodySchema = zod_1.z.object({
                email: zod_1.z.string(),
                password: zod_1.z.string(),
                name: zod_1.z.string()
            });
            const { email, password, name } = bodySchema.parse(req.body);
            const existingUser = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return reply.status(400).send({ message: "Username already exists" });
            }
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);
            yield prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password
                },
            });
            reply.status(201).send({ message: 'User registered successfully' });
        }));
    });
}
exports.default = register;
