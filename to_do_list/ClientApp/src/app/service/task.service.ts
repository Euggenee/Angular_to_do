import { DataService } from "./data.service";
import { Task } from "src/app/model/Task";
import { Category } from 'src/app/model/category';
import { Priority } from 'src/app/model/priority';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { ITask } from "../interface/task-interface";
import { HttpService } from "./http-service.service";


@Injectable({
  providedIn: 'root'
})

export class TaskService implements ITask {


  constructor(private dataService: DataService, private httpServise: HttpService) { }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = this.dataService.tasks;

    // Apply all conditions one by one (which are not empty)
    if (status != null) {
      allTasks = allTasks.filter(task => task.complited == status);
    }
    if (category != null) {
      allTasks = allTasks.filter(task => task.category.title == category.title && task.category.id == category.id);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority.title == priority.title && task.priority.id == priority.id);
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
    const completed = false;
    const userId = parseInt(localStorage.getItem("userId"))
    this.httpServise.postNewTask(task, completed, userId).subscribe(() => {
      this.dataService.updateDataServiceTasks()
    })
    return of(task);
  }

  get(id: number): Observable<Task> {
    return of(this.dataService.tasks.find(todo => todo.id === id));
  }

  delete(taskId): Observable<Task> {
    this.httpServise.deleteTask(taskId).subscribe((response) => {
      this.dataService.updateDataServiceTasks();
    })
    return of();
  }

  update(task: Task): Observable<Task> {
    const userId = parseInt(localStorage.getItem("userId"))
    this.httpServise.putUpdateTask(task, userId).subscribe(() => {
      this.dataService.updateDataServiceTasks();
    })
    return of(task);
  }

  getAll(): Observable<Task[]> {
    return this.dataService.tasks$;
  }
}
