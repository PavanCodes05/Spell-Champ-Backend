import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/index.js"

interface AuthRequest extends Request {
    user?: {userId: string};
};

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: "Unauthorized"});
        return;
    };

    const token = authHeader.split(" ")[1];
    try {
        const decoded = JWT.verifyToken(token);
        req.user = { userId: decoded.userId };
        next();
        return; 
    } catch (error) {
        res.status(403).json({message: "Invalid Token"});  
        return; 
    };
};

const AuthMiddleware = { authMiddleware }

export default AuthMiddleware;
export type { AuthRequest };