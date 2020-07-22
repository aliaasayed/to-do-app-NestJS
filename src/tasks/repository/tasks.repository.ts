import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Task } from '../schema/task.schema';

@Injectable()
export class TaskRepository {

    constructor(@InjectModel('Task') private taskModel: Model<Task>) {
    }

    async findAll(query): Promise<Task[]> {
        return this.taskModel.find(query).exec();
    }

    async findOne(query): Promise<Task> {
        return this.taskModel.findOne(query).exec();
    }

    async create(data): Promise<Task> {
        return this.taskModel.create(data);
    }

    async update(query, updatedData): Promise<any> {
        return this.taskModel.update(query, updatedData, { new: true });
    }

    async delete(query): Promise<any> {
        return this.taskModel.deleteOne(query);
    }
}
