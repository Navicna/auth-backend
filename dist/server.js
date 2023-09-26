"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = require("@fastify/cors");
const get_all_users_1 = require("./routes/get-all-users");
const register_1 = __importDefault(require("./routes/register"));
const app = (0, fastify_1.fastify)();
app.register(cors_1.fastifyCors, {
    origin: '*'
});
app.register(get_all_users_1.getAllUsersRoute);
app.register(register_1.default);
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!');
});
