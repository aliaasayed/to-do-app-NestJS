
import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

export interface Task extends Document {
    id: string;
    title: string;
    description: string;
    userId: string;
}
