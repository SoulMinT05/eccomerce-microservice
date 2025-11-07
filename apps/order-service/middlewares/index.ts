import { getAuth } from '@clerk/fastify';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        userId?: string;
    }
}

export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { isAuthenticated, userId } = await getAuth(request);
    if (!isAuthenticated || !userId) {
        return reply.code(401).send({
            message: 'You are not logged in',
        });
    }

    request.userId = userId;
};
