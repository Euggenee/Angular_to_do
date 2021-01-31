import { Priority } from "./priority";
import { Category } from "./category";


export class Task {
  id?: number;
  title: string;
  complited?: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;
  userId?: number

  constructor(title: string, complited?: boolean, priority?: Priority, category?: Category, date?: Date, userId?: number) {
    title = this.title,
      complited = this.complited,
      priority = this.priority,
      category = this.category,
      date = this.date,
      userId = this.userId
  }
}
