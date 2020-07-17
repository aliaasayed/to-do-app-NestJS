import {
    Controller,
    Request,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
    UseGuards
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TasksService } from './services/tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() body: any) {
        const generatedId = await this.tasksService.create(req.user, body)
        return { id: generatedId };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTasks(@Request() req, @Query() query) {
        const products = await this.tasksService.getAllTasks(req.user, query);
        return products;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getTask(@Request() req, @Param('id') taskId: string) {
        return this.tasksService.getTask(req.user, taskId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateTask(
        @Request() req,
        @Param('id') taskId: string,
        @Body() body: any
    ) {
        const result = await this.tasksService.updateTask(req.user, taskId, body);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteTask(@Request() req, @Param('id') taskId: string) {
        const result = await this.tasksService.deleteTask(req.user, taskId);
        return result;
    }
}
