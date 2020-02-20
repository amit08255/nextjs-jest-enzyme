import express from 'express';
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const port = process.env.PORT || 7000;

app
  .prepare()
  .then(() => {

        const server = express();

        server.get("/", (req:any, res:any) => {
          const actualPage = '/index';
          const queryParams = {};
          app.render(req, res, actualPage, queryParams);
        });

        server.get('*', (req:express.Request, res:express.Response) => {
          return handle(req, res);
        });

        server.listen(port);
  })
  .catch((ex: { stack: any; }) => {

        console.error(ex.stack);
        process.exit(1);
        
  });

  