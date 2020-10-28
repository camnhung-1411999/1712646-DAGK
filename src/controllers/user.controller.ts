import UserService from '../services/user.service';
import { Request, Response } from 'express';
import { User } from '../types/user.type';
class UserController {
    async list(res: Response) {
        const users = await UserService.list();
        res.json(users);
    }

    async find(req: Request, res: Response) {
        const username = req.params.username;
        const user = await UserService.find(username);
        res.json(user);
    }

    async detail(req: Request, res: Response) {
        const iuser: User = {
            user: req.body.username,
            password: req.body.password,
        }
        const user = await UserService.detail(iuser);
        res.json(user);

    }

    async create(req: Request, res: Response) {
        const input = {
            ...req.body,
        }
        const user = await UserService.create(input);
        res.json(user);

    }
    async update(req: Request, res: Response) {
        const input = {
            ...req.body,
        }
        const user = await UserService.update(input);
        res.json(user);

    }
    
}

export default new UserController();