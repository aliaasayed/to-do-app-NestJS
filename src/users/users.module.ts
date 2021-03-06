import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { UserController } from './users.controller';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/users.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
    }])
  ],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UserController]
})
export class UsersModule { }
