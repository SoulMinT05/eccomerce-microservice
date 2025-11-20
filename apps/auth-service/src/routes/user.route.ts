import { Router } from 'express';
import clerkClient from '../utils/clerk';

const router: Router = Router();

router.get('/', async (req, res) => {
    const users = await clerkClient.users.getUserList();
    return res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await clerkClient.users.getUser(id);
    res.status(200).json(user);
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    const user = await clerkClient.users.createUser(newUser);
    res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await clerkClient.users.deleteUser(id);
    res.status(200).json(user);
});
export default router;
