import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface ReqBody{
  email: string,
  password: string,
  name: string
}

class UserController {
    public async index(req:Request, res:Response): Promise<Response> {
      const users = await prisma.user.findMany()
      return res.json(users);
    }

    public async store(req: Request, res: Response): Promise<Response>{
        // console.log(req.body);
        const { email, password, name }:ReqBody = req.body
        const newuser = await prisma.user.create({
            data: { 
              email: email,
              password: password,
              name: name,
             },
        })
          return res.status(201).send('You are registred now');
    }
 }

 export default new UserController();
