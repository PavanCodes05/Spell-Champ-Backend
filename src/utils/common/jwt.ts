import jwt from "jsonwebtoken"

import { ServerConfig } from "../../config/index.js"

const JWT_SECRET = ServerConfig.JWT_SECRET as string;

interface Payload {
    userId: string;
};

const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: "45d"});
};

const verifyToken = (token: string): Payload => {
    return jwt.verify(token, JWT_SECRET) as Payload;
}

const JWT = { generateToken, verifyToken }
export default JWT;