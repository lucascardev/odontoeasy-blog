import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


class DraftsController {
  public async index(req:Request, res:Response): Promise<Response> {
    const drafts = await prisma.post.findMany({
        where: { published: false },
        include: { author: true },
      })
      return res.json(drafts)
  }
}

export default new DraftsController