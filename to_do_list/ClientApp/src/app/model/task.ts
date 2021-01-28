import { Priority } from "./priority";
import { Category } from "./category";


export class Task {
  id: number;
  title: string;
  completed?: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;

  constructor(id: number, title: string, completed: boolean, priority: Priority, category: Category) {
    id = this.id,
      title = this.title,
      completed = this.completed,
      priority = this.priority,
      category = this.category
  }
}
