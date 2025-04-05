import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '../../.env')});

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET

const ServerConfig = { PORT, JWT_SECRET };

export default ServerConfig;