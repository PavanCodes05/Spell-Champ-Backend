import express, { Express } from 'express';

import { ServerConfig } from './config';
import { v1Routes } from './routes';

const app: Express = express();

app.use('/v1', v1Routes);

app.listen(ServerConfig, () => {
    console.log(`Server is running on the port: ${ServerConfig}`);
});