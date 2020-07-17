import {
    Controller,
    Body,
    Post
} from '@nestjs/common';

import { UsersService } from './services/users.service';

@Controller('users')
export class UserController {
    constructor(private userService: UsersService) { }
    @Post('register')
    async register(@Body() body: any) {
        const user = await this.userService.register(body);
        return {
            message: "User has registered successfully",
            user
        };
    }
}