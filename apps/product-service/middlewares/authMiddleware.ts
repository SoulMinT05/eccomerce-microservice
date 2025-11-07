import { getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export const shouldBeUser = async (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const { userId, isAuthenticated } = auth;
    if (!userId || !isAuthenticated) {
        return res.status(401).json({
            message: 'You are not logged in',
        });
    }

    req.userId = userId;

    next();
};
