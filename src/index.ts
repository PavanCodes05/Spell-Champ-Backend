import express, { Express } from 'express';
import cors from "cors";

import { ServerConfig } from './config/index.js';
import apiRoutes from './routes/index.js';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions)); 
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on the port: ${ServerConfig.PORT}`);
});