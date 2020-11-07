import BoardCollection, { IBoard } from '../model/board.model';
import authUtils from '../utils/auth';

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
        const imembers: any=[user];
        const board = await BoardCollection.find({
            createdBy: user,
        });
        let iboard = await BoardCollection.find({
            members: {
                $in: [user]
            }
        });
        iboard = [
            ...iboard,
            ...board
        ]
        return iboard;
    }

    async findName(id: string) {
        const board = await BoardCollection.findOne({
            _id: id,
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

    async update(input: any) {
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
        if (input.accessToken) {
             const verifyUser:any = await authUtils.verifyJWT(input.accessToken);
            board.members.push(verifyUser.user);
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