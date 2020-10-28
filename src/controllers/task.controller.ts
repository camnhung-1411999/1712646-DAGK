import TaskService from '../services/task.service';
import { Request, Response } from 'express';
class TaskController {
    async list(req: Request, res: Response) {
        const input = {
            type: req.query.type,
            board: req.query.board,
        }
        const tasks = await TaskService.list(input);
        res.json(tasks);
    }

    async find(req: Request, res: Response) {
        const id = req.params.id;
        const task = await TaskService.find(id);
        res.json(task);

    }

    async create(req: Request, res: Response) {
        const input = {
            ...req.body,
        }
        const task = await TaskService.create(input);
        res.json(task);
    }
    async update(req: Request, res: Response) {
        const input = {
            ...req.body,
            id: req.params.id,
        }
        const task = await TaskService.update(input);
        res.json(task);
    }

    async delete(req: Request, res: Response) {
        const task = await TaskService.delete(req.params.id);
        res.json(task);

    }
}

export default new TaskController();