import { z } from "zod";
import { FastifyInstance } from "fastify";
import prisma from "../lib/prisma";
// import bcrypt from 'bcrypt'

async function register(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string()
    });

    const { email, password, name } = bodySchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ message: "Username already exists" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,      
        password        
      },
    });

    reply.status(201).send({ message: 'User registered successfully' });

  });
}

export default register;
