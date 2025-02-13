import express, { Express } from 'express';

import { ServerConfig } from './config/index.js';
import apiRoutes from './routes/index.js';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on the port: ${ServerConfig.PORT}`);
});