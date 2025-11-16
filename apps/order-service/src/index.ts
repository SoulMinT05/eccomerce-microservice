import Fastify from 'fastify';
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify';
import { shouldBeUser } from './middlewares/authMiddleware.js';
import { connectOrderDB } from '@repo/order-db';
import { orderRoute } from './routes/order.route.js';
import { consumer, producer } from './utils/kafka.js';
import { runKafkaSubscriptions } from './utils/subscriptions.js';

const PORT = 8001;
const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
    return reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

fastify.get('/test', { preHandler: shouldBeUser }, async (request, reply) => {
    const userId = request.userId;
    // if (!userId) {
    //     return reply.code(404).send({
    //         message: `User with id ${userId} not found`,
    //     });
    // }

    // const user = await clerkClient.users.getUser(userId);
    return reply.code(200).send({
        message: 'Order service authenticated',
        // user,
        userId,
    });
});

fastify.register(orderRoute);

const start = async () => {
    try {
        Promise.all([(await connectOrderDB(), await producer).connect(), (await consumer).connect()]);
        await runKafkaSubscriptions();
        await fastify.listen({ port: PORT });
        console.log(`Order service is running on port ${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
