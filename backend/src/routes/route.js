

async function route (app, options) {
    app.register(require("fastify-formbody"));

    app.post(`/user`, async (req, res) => {
        const { name, email } = req.body;
        const result = await prisma.user.create({
          data: {
            name,
            email,
          },
        });
        res.send(result);
      });
      app.get(`/user/:id`, async (req, res) => {
        const { id } = req.params;
        const user = await prisma.user.findOne({
          where: {
            id: parseInt(id),
          },
        });
        res.send(user);
      });
}

module.exports = route;