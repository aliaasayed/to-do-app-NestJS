import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../schema/user.schema';

@Injectable()
export class UserDbModel {
    constructor(@InjectModel('User') private taskModel: Model<User>) { }

    async findOne(query): Promise<User> {
        return this.taskModel.findOne(query).exec();
    }

    async create(data): Promise<User> {
        return this.taskModel.create(data);
    }
}
