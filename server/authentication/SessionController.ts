require("dotenv").config();
import Token from './token.auth'
import {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
// const cryptofunc = require("../utils/crypto");


class SessionController {

 public async load(req:Request, res:Response):Promise<Response>{
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // if (token.startsWith('bearer') ) {
    //   // Remove Bearer from string
    //   token = token.slice(7, token.length);
    // } // Express headers are auto converted to lowercase
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  const loadedresponse = await Token.verifytoken(token);
  return res.json(loadedresponse);
  }

  public async create(req:Request, res:Response):Promise<Response>{
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).send("Empty request");
    }

    const payload = await prisma.user.findOne({
      where: {
        email: email
      },
    })
    // autenticate username and password with data base
    // console.log('payload is: '+ JSON.stringify(payload))
    if (!payload) {
      return res.status(400).send("No user was found");
    } else {
      const JWTData = {
        // exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
        iss: "odonto-easy",
        sub: { userid: payload.id, name: payload.name, auth: true },
        scopes: [ payload.name ]
      };

      if (
        payload.email === email &&
        payload.password === password
      ) {
        const token = await Token.autenticatelogin(JWTData);
        res.status(200);
        res.json(token);
      } else {
        res.status(401).send("Incorrect credentials");
      }
    }
  }
};

export default new SessionController();