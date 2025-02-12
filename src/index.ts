import express, { Express } from 'express';

import { ServerConfig } from './config';

const app: Express = express();

app.listen(ServerConfig, () => {
    console.log(`Server is running on the port: ${ServerConfig}`);
});