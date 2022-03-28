import express, { Application } from 'express'
const cors = require ('cors');
import next from 'next'
require('dotenv/config')


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
import routes from './routes';
const server: Application = express();
const handle = app.getRequestHandler()


app
  .prepare()
  .then(() => {
    server.use(express.json())
    server.use(cors())
    server.use(routes);
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(process.env.PORT || 3000, (err?:any) => {
      if (err) throw err;
      console.log(`> Ready - enviroment of ${process.env.NODE_ENV}`);
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });

