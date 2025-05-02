import { Schema, model, Document } from 'mongoose';

interface ITodo extends Document {
  text: string;
  completed: boolean;
  priority: number; // Prioridad calculada
}

const todoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
});

const Todo = model<ITodo>('Todo', todoSchema);
export default Todo;
