
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.getUser(username);
        const isPasswordMatching = await bcrypt.compare(pass, user.password);
        if (user && isPasswordMatching) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        user = user._doc;
        const payload = { username: user.username, id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
