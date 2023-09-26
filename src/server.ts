import { fastify } from "fastify";

import { fastifyCors } from '@fastify/cors'
import { getAllUsersRoute } from "./routes/get-all-users";
import register from "./routes/register";

const app = fastify();

app.register(fastifyCors, {
    origin: '*'
})

app.register(getAllUsersRoute)
app.register(register)


app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})