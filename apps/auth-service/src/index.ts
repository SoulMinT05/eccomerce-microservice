import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { clerkMiddleware, getAuth } from '@clerk/express';
import { shouldBeAdmin } from './middlewares/authMiddleware.js';
import router from './routes/user.route.js';

const PORT = 8003;
const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use(
    cors({
        origin: ['http://localhost:3003'],
        credentials: true,
    })
);

app.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.use('/users', shouldBeAdmin, router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Auth service is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
