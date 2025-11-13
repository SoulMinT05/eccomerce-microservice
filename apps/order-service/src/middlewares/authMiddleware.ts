import { getAuth } from '@clerk/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import type { CustomJwtSessionClaims } from '@repo/types';

declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { isAuthenticated, userId } = await getAuth(request);
    if (!isAuthenticated || !userId) {
        return reply.code(401).send({ message: 'You are not logged in' });
    }

    request.userId = userId;
};

export const shouldBeAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
    const auth = await getAuth(request);
    if (!auth.isAuthenticated || !auth.userId) {
        return reply.code(401).send({ message: 'You are not logged in' });
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== 'admin' && claims.metadata?.role !== 'staff') {
        return reply.code(403).send({ message: 'Unauthorized' });
    }

    request.userId = auth.userId;
};
