import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from "../repository/users.repository";

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) { }

    async register(body: any) {
        const user = await this.userRepository.findOne({ username: body.username });
        if (user) {
            throw new ForbiddenException('User Name is already exist.!')
        }

        const saltRounds = 12;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const result = await this.userRepository.create({
            username: body.username,
            email: body.email,
            password: hashedPassword
        });
        return result.id as string;
    }

    async getUser(username: string) {
        const user = await this.userRepository.findOne({ username: username });
        return user;
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({ _id: id });
        return user;
    }
}
