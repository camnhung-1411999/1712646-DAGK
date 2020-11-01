import BoardCollection, { IBoard } from '../model/board.model';

class BoardService {
    async list(input: any) {
        let condition = {};
        if (input.createBy) {
            condition = {
                ...condition,
                createBy: input.createBy,
            }
        }

        if (input.name) {
            condition = {
                ...condition,
                name: input.name,
            }
        }
        const boards = await BoardCollection.find(condition);
        return boards;
    }

    async find(user: string) {
        const board = await BoardCollection.find({
            createdBy: user,
        });
        return board;
    }

    async create(input: IBoard) {
        const board = await BoardCollection.create({
          createdBy: input.createdBy,
          name: input.name,
          members: input.members,
        });
        return board;
    }

    async update(input: IBoard) {
        const board = await BoardCollection.findOne({
            _id: input.id,
        });

        if (!board) {
            const err: Error = new Error();
            err.message = ' Board not found';
            err.name = 'Error';
            throw err;
        }
        if (input.name) {
            board.name = input.name;
        }
        if (input.members) {
            board.members = input.members;
        }

        await board.save();

        return board;
    }

    async delete(input: string) {
        await BoardCollection.findOneAndRemove({
            _id: input,
        }).catch((err)=>{
            throw err;
        })
        return true;
    }
}

export default new BoardService();