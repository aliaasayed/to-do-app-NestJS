import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants/constants';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction): Promise<any> {
        const authHeaders = req.headers.authorization;
        if (authHeaders && (authHeaders as string).split(' ')[1]) {
            const token = (authHeaders as string).split(' ')[1];
            try {
                const decoded: any = jwt.verify(token, jwtConstants.secret);
                const user = await this.userService.findOne(decoded.id);

                if (!user) {
                    throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
                }

                req.user = {
                    userId: user.id,
                    username: user.username
                };
                next();

            } catch (e) {
                throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
            }
        } else {
            throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
        }
    }
}
