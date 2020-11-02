import BoardService from '../services/board.service';
import { Request, Response } from 'express';
class BoardController {
    async list(req: Request, res: Response) {
        let input = {};
        if (req.query.name) {
            input = {
                ...input,
                name: req.query.name,
            };
        }
        if (req.query.createdBy) {
            input = {
                ...input,
                createdBy: req.query.createdBy,
            };
        }
        const boards = await BoardService.list(input);
        res.send(boards)
    }

    async find(req: Request, res: Response) {
        const user = req.params.user;
        const board = await BoardService.find(user);
        res.send(board);
    }

    async create(req: Request, res: Response) {
        const input = {
            ...req.body,
        }
        const board = await BoardService.create(input);
    }
    async update(req: Request, res: Response) {
        const input = {
            ...req.body,
            id: req.params.id,
        }
        const board = await BoardService.update(input);
        return board;
    }

    async delete(req: Request) {
        const board = await BoardService.delete(req.params.id);
        return board;
    }
}

export default new BoardController();