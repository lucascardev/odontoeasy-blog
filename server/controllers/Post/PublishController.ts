import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


class PublishController {
 public async update(req:Request, res:Response): Promise<Response>{
    const { postId } = req.params
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    })
    return res.status(200).json(post)
 } 
}

export default new PublishController();