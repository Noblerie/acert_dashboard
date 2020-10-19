const fastify = require('fastify')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const routes = require('./routes/route.js')
const app = fastify({ logger: true });
app.register(require('fastify-cors'), {
  origin: '*'
})
const server = app.listen(3000, () =>
  console.log(
    ":fusée: Server ready at: http://localhost:3000\n:étoile:️"
  )
);