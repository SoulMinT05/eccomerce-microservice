import { getAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import type { CustomJwtSessionClaims } from '@repo/types';

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

export const shouldBeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const { userId, isAuthenticated } = auth;
    if (!userId || !isAuthenticated) {
        return res.status(401).json({
            message: 'You are not logged in',
        });
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims;
    if (claims.metadata?.role !== 'admin' && claims.metadata?.role !== 'staff') {
        return res.status(403).send({ message: 'Unauthorized' });
    }

    req.userId = userId;

    next();
};
