import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  const { searchString } = req.query
  const resultPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: { contains: searchString },
        },
        {
          content: { contains: searchString },
        },
      ],
    },
  })
  res.json(resultPosts)
}