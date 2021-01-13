import { Task } from "./task";

export class User {
    id: number;
    name: string;
    password?: string;
    email?: string;
    tasks?: Array<Task>;
}
