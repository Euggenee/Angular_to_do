export class Category {
  id?: number;
  title?: string;
  userId?: number;

  constructor(title: string, userId: number, ) {
    this.title = title,
      this.userId = userId
  }
}
