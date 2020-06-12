import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface ReqBody{
    title: string,
    authorEmail: string,
    content: string
  }

  class PostController {
      public async store(req: Request, res: Response): Promise<Response>{
          const { title, authorEmail, content }:ReqBody = req.body;
          console.log(req.body);
          const result = await prisma.post.create({
              data: { 
                  title: title,
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
   }
  
   export default new PostController();