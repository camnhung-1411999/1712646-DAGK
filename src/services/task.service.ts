import TaskCollection, { ITask } from '../model/task.model';

class TaskService {
    async list(input: any) {
        let condition = {};
        if (input.status) {
            condition = {
                ...condition,
                status: input.status,
            }
        }

        if (input.board) {
            condition = {
                ...condition,
                board: input.board,
            }
        }
        const tasks = await TaskCollection.find(condition);
        return tasks;
    }

    async find(id: string) {
        const task = await TaskCollection.findOne({
            _id: id,
        });

        if (!task) {
            const err: Error = new Error();
            err.message = ' Task not found';
            err.name = 'Error';
            throw err;
        }
        return task;
    }

    async create(input: ITask) {
        const task = await TaskCollection.create({
          status: input.status,
          content: input.content,
          createdBy: input.createdBy,
          updatedBy: input.updatedBy,
          board: input.board,
        });
        return task;
    }

    async update(input: ITask) {
        const task = await TaskCollection.findOne({
            _id: input.id,
        });

        if (!task) {
            const err: Error = new Error();
            err.message = ' Task not found';
            err.name = 'Error';
            throw err;
        }
        if (input.status) {
            task.status = input.status;
        }
        if (input.content) {
            task.content = input.content;
        }
        task.updatedBy = input.updatedBy;

        await task.save();

        return task;
    }

    async delete(input: string) {
        await TaskCollection.findOneAndRemove({
            _id: input,
        }).catch((err)=>{
            throw err;
        })
        return true;
    }
}

export default new TaskService();