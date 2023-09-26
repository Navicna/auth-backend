
import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";

export async function getAllUsersRoute(app: FastifyInstance) {
  app.get("/users", async () => {
    const user = await prisma.user.findMany();

    return user;
  });
}
