export class Priority {
  id: number;
  title: string;
  color?: string;
  userId?: number;

  constructor(title: string, color?: string, userId?: number) {
    this.title = title,
      this.color = color,
      this.userId = userId
  }
}
