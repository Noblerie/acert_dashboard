const fastify = require('fastify')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = fastify({ logger: true });
const sgMail = require('@sendgrid/mail');
app.register(require('fastify-cors'), {
  origin: '*'
})
const server = app.listen(3001, () =>
  console.log(
    ":fusée: Server ready at: http://localhost:3001\n:étoile:️"
  )
);



app.register(require("fastify-formbody"));

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.send(result);
});

app.post(`/post`, async (req, res) => {
  const { email, name } = req.body;
  const result = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.send(result);
});

app.post(`/new/member`, async (req, res) => {
  const { email, name, phone_number } = req.body;
  const result = await prisma.user.create({
    data: {
      email,
      name,
      phone_number,
    },
  });
  res.send(result);
});

app.post(`/new/email`, async (req, res) => {
  const { email } = req.body;
  sgMail.setApiKey("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")
  const msg = {
    to: email,
    from: 'esteban.hulin@acert.io',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    template_id:'d-fb6cc08c12104aebb42a60f1f5f9abad'
  }
  sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
    })
    .catch((error) => {
      console.log("------2------");
      console.log(process.env.SENDGRID_API_KEY);
    console.log("------3------");
    console.error(error)
    })
  return;
});

app.post(`/team`, async (req, res) => {
  const { name, owner_id } = req.body;
  try {
    const result = await prisma.team.create({
      data: {
        name,
        owner_id,
      },
    });
        const many_to_many = await prisma.team.update({
          data: {
            user_id: {
              connect: {
                id: owner_id
              }
            }
          },
          where: {
            id: result.id
          }
        })
        res.send(many_to_many);

  }
  catch(error) {

    console.log(error);
  }
  console.log("------------");
  console.log(result);
  console.log("------------");
});

app.put("/users", async (req, res) => {
  const { team } = req.params;
  const post = await prisma.team.update({
    where: {
      team: parseInt(team),
    },
    data: { member },
  });
  res.send(post);
});

app.patch("/team/up/:id", async (req, res) => {
  const { id } = req.params;
  const { update } = req.body;
  const post = await prisma.team.update({
    where: {
      id: parseInt(id),
    },
    data: { name: update },
  })
  res.send(post);
});

app.delete("/team/delete/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.team.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.send(post);
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(post);
});

app.get(`/team/get/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.team.findOne({
    where: {
      id: parseInt(id),
    },
  });
  res.send(post);
});

app.get(`/user/team/get/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.findOne({
    where: {
      id: parseInt(id),
    },
    include: {teams: true}
  });
  res.send(post);
});

app.get("/feed", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  res.send(posts);
});

app.get("/filterPosts", async (req, res) => {
  const { searchString } = req.query;
  const draftPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  });
  res.send(draftPosts);
});
