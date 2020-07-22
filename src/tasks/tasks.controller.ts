import {
    Controller,
    Request,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query
} from '@nestjs/common';
import { TasksService } from './services/tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    async create(@Request() req, @Body() body: any) {
        const generatedId = await this.tasksService.create(req.user, body)
        return { id: generatedId };
    }

    @Get()
    async getAllTasks(@Request() req, @Query() query) {
        const products = await this.tasksService.getAllTasks(req.user, query);
        return products;
    }

    @Get(':id')
    getTask(@Request() req, @Param('id') taskId: string) {
        return this.tasksService.getTask(req.user, taskId);
    }

    @Patch(':id')
    async updateTask(
        @Request() req,
        @Param('id') taskId: string,
        @Body() body: any
    ) {
        const result = await this.tasksService.updateTask(req.user, taskId, body);
        return result;
    }

    @Delete(':id')
    async deleteTask(@Request() req, @Param('id') taskId: string) {
        const result = await this.tasksService.deleteTask(req.user, taskId);
        return result;
    }
}
