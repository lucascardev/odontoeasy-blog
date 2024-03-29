import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface ReqBody{
    title: string,
    authorEmail: string,
    content: string,
    description: string,
  }

  class PostController {

      public async index(req: Request, res: Response): Promise<Response>{
        const { postId } = req.params
        const post = await prisma.post.findUnique({
            where: { id: Number(postId) },
            include: { author: true },
          })
          return res.json(post)
      }

      public async store(req: Request, res: Response): Promise<Response>{
         const { postId } = req.params
          const { title, authorEmail, content, description }:ReqBody = req.body;

          const result = await prisma.post.create({
              data: { 
                  title: title,
                  description: description,
                  content: content,
                  author: {
                      connect: {
                          email: authorEmail, 
                        },
                  },
               },
          })
            return res.status(201).json(result);
      }

      public async delete(req: Request, res: Response): Promise<Response>{
        const { postId } = req.params
        const post = await prisma.post.delete({
            where: { id: Number(postId) },
          })
         return res.json(post)
      }
   }
  
   export default new PostController();