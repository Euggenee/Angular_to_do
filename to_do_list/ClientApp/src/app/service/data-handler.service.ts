import { Category } from 'src/app/model/category';
import { Task } from "src/app/model/Task";
import { DataService } from "./data.service";
import { CategoryImplemInterfaceService } from './categoryImplemInterface.service';
import { TaskImplemInterfaseService } from './taskImplemInterface.service';
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable, of } from "rxjs";
import { Priority } from '../model/priority';
import { PriorityImplemInterfaceService } from './priorityImplemInterface.servise';

@Injectable({
  providedIn: "root",
})

// This service generalizes the logic implemented in services (PriorityImplemInterfaceService, CategoryImplemInterfaceService, TaskImplemInterfaseService)
export class DataHandlerService {

  private category: Category

  constructor(
    private priorityImplemInterfase: PriorityImplemInterfaceService,
    private categoryImplemInterfase: CategoryImplemInterfaceService,
    private taskImplemInterfase: TaskImplemInterfaseService) { }


  //Task

  getAllTasks(): Observable<Task[]> {
    return this.taskImplemInterfase.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityImplemInterfase.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskImplemInterfase.update(task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.taskImplemInterfase.delete(task.id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskImplemInterfase.add(task);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskImplemInterfase.search(category, searchText, status, priority)
  }


  //Category

  updateCategory(category: Category): Observable<Category> {
    return this.categoryImplemInterfase.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryImplemInterfase.delete(id);
  }

  addCategory(title: string): Observable<Category> {
    const userId = parseInt(localStorage.getItem("userId"))
    this.category = new Category(title, userId)
    return this.categoryImplemInterfase.add(this.category);
  }

  getAllCategoryes(): Observable<Category[]> {
    return this.categoryImplemInterfase.getAll();
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryImplemInterfase.search(title);
  }


  // Statistics

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskImplemInterfase.getComplitedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskImplemInterfase.getUncomplitedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskImplemInterfase.getTotalCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskImplemInterfase.getUncomplitedCountInCategory(null);
  }


  //A priority

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityImplemInterfase.add(priority);
  }

  deltePriority(priority): Observable<Priority> {
    return this.priorityImplemInterfase.delete(priority.id);
  }

  updatePrioriry(priority: Priority): Observable<Priority> {
    return this.priorityImplemInterfase.update(priority);
  }
}
