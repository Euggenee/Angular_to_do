import { DataService } from "./data.service";
import { TaskInterfase } from '../data/dao/interface/taskInterface';
import { Task } from 'src/app/model/Task';
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class TaskImplemInterfaseService implements TaskInterfase {


  constructor(private dataService: DataService) { }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = this.dataService.tasks;

    // Apply all conditions one by one (which are not empty)
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          // Consider the search text (if '' - all values ​​are returned)
          task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }
    return allTasks;
  }

  searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = this.dataService.tasks;

    if (category != null) {
      allTasks = this.dataService.tasks.filter(todo => todo.category === category)
    }
    return allTasks;
  }

  // The number of completed tasks in the given category (if category === null, then for all categories)
  getComplitedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, true, null).length);
  }

  // Number of unfinished tasks in a given category (if category === null, then for all categories)
  getUncomplitedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, false, null).length);
  }

  // Number of all tasks in a given category (if category === null, then for all categories)
  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, null, null).length);
  }

  // Number of all tasks in total
  getTotalCount(): Observable<number> {
    return of(this.dataService.tasks.length);
  }

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    this.dataService.tasks.push(task);
    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, this.dataService.tasks.map(task => task.id)) + 1;
  }

  get(id: number): Observable<Task> {
    return of(this.dataService.tasks.find(todo => todo.id === id));
  }

  delete(id: number): Observable<Task> {
    const taskTmp = this.dataService.tasks.find(t => t.id === id);     //удаляем по id
    this.dataService.tasks.splice(this.dataService.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);
  }

  update(task: Task): Observable<Task> {
    const taskTmp = this.dataService.tasks.find(t => t.id === task.id);
    this.dataService.tasks.splice(this.dataService.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

  getAll(): Observable<Task[]> {
    console.log(this.dataService.tasks)
    return of(this.dataService.tasks);
  }
}