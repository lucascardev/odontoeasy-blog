import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

class FeedController {
    public async index(req: Request, res: Response): Promise<Response>{
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: { author: true },
          })
          return res.json(posts)
      }
}

export default new FeedController();