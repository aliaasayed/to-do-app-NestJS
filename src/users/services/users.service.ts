import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDbModel } from "../model/users.dbModel";

@Injectable()
export class UsersService {
    constructor(private user: UserDbModel) { }

    async register(body: any) {
        const user = await this.user.findOne({ username: body.username });
        if (user) {
            throw new ForbiddenException('User Name is already exist.!')
        }
        
        const saltRounds = 12;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const result = await this.user.create({
            username: body.username,
            email: body.email,
            password: hashedPassword
        });
        return result.id as string;
    }

    async getUser(username: string) {
        const user = await this.user.findOne({ username: username });
        return user;
    }
}
