import http from 'http';
import constants from './constants';
import { createHandler } from 'graphql-http/lib/use/http';
import schema from './schema';

import controllers from './db/controllers';

const { PORT } = constants;
const handler = createHandler({ schema });

 
const server = http.createServer( async (req, res) => {
    if (req && req.url && req.url === '/test') {
 
      await controllers.getAllCompaniesAndRef();
      res.writeHead(200).end('ok');
    }
    if (req && req.url?.startsWith('/graphql')) {
        handler(req, res);
      } else {
        res.writeHead(404).end();
      }
});

server.listen(PORT, () => {
    console.log(`server is up at ${PORT}`);
});