import TaskService from '../services/task.service';
import { Request, Response } from 'express';
class TaskController {
    async list(req: Request) {
        const input = {
            type: req.query.type,
            board: req.query.board,
        }
        const tasks = await TaskService.list(input);
        return tasks;
    }

    async find(req: Request, res: Response) {
        const id = req.params.id;
        const task = await TaskService.find(id);
        return task;
    }

    async create(req: Request, res: Response) {
        const input = {
            ...req.body,
        }
        const task = await TaskService.create(input);
        return task;
    }
    async update(req: Request, res: Response) {
        const input = {
            ...req.body,
            id: req.params.id,
        }
        const task = await TaskService.update(input);
        return task;
    }

    async delete(req: Request) {
        const task = await TaskService.delete(req.params.id);
        return task;
    }
}

export default new TaskController();