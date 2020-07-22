import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksService } from './services/tasks.service'
import { TasksController } from './tasks.controller';
import { TaskSchema } from './schema/task.schema';
import { TaskRepository } from './repository/tasks.repository';

import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Task',
      schema: TaskSchema
    }]),
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
  exports: [TasksService]
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, LoggerMiddleware)
      .forRoutes('tasks');
  }
}
