import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schema/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private taskModel: Model<User>) { }

    async findAll(query): Promise<User[]> {
        return this.taskModel.find(query).exec();
    }

    async findOne(query): Promise<User> {
        return this.taskModel.findOne(query).exec();
    }

    async create(data): Promise<User> {
        return this.taskModel.create(data);
    }

    async update(query, updatedData): Promise<any> {
        return this.taskModel.update(query, updatedData, { new: true });
    }

    async delete(query): Promise<any> {
        return this.taskModel.deleteOne(query);
    }
}
