import { Module, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksService } from './services/tasks.service'
import { TasksController } from './tasks.controller';
import { TaskSchema } from './schema/task.schema';
import { TaskDbModel } from './model/tasks.dbModel';

import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Task',
      schema: TaskSchema
    }])
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskDbModel],
  exports: [TasksService]
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('tasks');
  }
}
