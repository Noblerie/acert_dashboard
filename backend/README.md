# test_prisma
prisma + fastify, adapted from [prisma example](https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-fastify)

## migrations
I added the dates. I had to delete the content of _MIGRATE table to start with.

Then I changed the schema.prisma file and ran the scripts :

```
npx prisma migrate save --experimental
```

```
npx prisma migrate up --experimental
```

```
npx prisma generate
```

## run the example
```
npm install
```

```
npm run dev
```

## make a post request
I used [HTTPie](https://httpie.org/).

Example of request : 

`http POST localhost:3000/post title=newtitle content=newcontent authorEmail=alice@prisma.io`

## view in prisma studio
```
npx prisma studio
```