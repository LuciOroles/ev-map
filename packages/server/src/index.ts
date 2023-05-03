import express from 'express'; 
import { createHandler } from 'graphql-http/lib/use/express';
 
import constants from './constants';
import schema from './graphql/schema';
import cors from "cors";


const { PORT } = constants;

const app = express();
 
app.all('/graphql', cors(), createHandler({ schema }));

app.listen({ port: PORT }, () => {
  console.log(`Listening to port ${PORT}`);
});


 