import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../repository/tasks.repository';

@Injectable()
export class TasksService {
    constructor(private taskRepository: TaskRepository) { }

    async create(user, body: any) {
        const result = await this.taskRepository.create({
            title: body.title,
            description: body.description,
            userId: user.userId
        });
        return result.id as string;
    }

    async getAllTasks(user, query) {
        const searchQuery: any = {
            userId: user.userId
        }

        if (query.title)
            searchQuery.title = { $regex: `${query.title}`, $options: 'i' };
        if (query.description)
            searchQuery.description = { $regex: `${query.description}`, $options: 'i' };

        const tasks = await this.taskRepository.findAll(searchQuery);
        return tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
        }));
    }

    async getTask(user, taskId: string) {
        const task = await this.taskRepository.findOne({
            userId: user.userId, _id: taskId
        });
        if (!task) {
            throw new NotFoundException('Could not find Task.');
        }
        return {
            id: task.id,
            title: task.title,
            description: task.description
        };
    }

    async updateTask(
        user,
        taskId: string,
        body: any
    ) {
        const updatedTask = await this.taskRepository.update(
            { userId: user.userId, _id: taskId },
            body);

        if (updatedTask.n === 0) {
            throw new NotFoundException('Could not find Task.');
        }
        else {
            return {
                message: 'Task updated successfully.'
            }
        }
    }

    async deleteTask(user, taskId: string) {
        const result = await this.taskRepository.delete({ _id: taskId, userId: user.userId });
        if (result.n === 0) {
            throw new NotFoundException('Could not find Task.');
        } else {
            return {
                message: 'Task deleted successfully'
            }
        }
    }
}
