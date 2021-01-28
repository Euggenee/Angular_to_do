import { Task } from "./Task";

export class User {
    id: number;
    name: string;
    password?: string;
    email?: string;
    tasks?: Array<Task>;
}
