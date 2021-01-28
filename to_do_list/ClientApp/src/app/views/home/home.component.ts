import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Task } from "src/app/model/Task";
import { Category } from "src/app/model/category";
import { Priority } from "src/app/model/priority";
import { DataHandlerService } from "src/app/service/data-handler.service";
import { zip } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
  //Fix it pass data by changing the link and using the immutable js library, use ChangeDetectionStrategy.onPush
})

export class HomeComponent implements OnInit {

  private title = 'Todo';
  private tasks: Task[];
  private categories: Array<Category> = new Array // All categories
  private priorities: Array<Priority> = new Array // All priorities

  // Statistics
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;
  private showStat = false;

  private selectedCategory: Category = null;

  // Search
  private searchTaskText = ''; // Current value for searching tasks

  // Filtering
  private priorityFilter: Priority;
  private statusFilter: boolean;
  private searchCategoryText: string;

  constructor(
    private dataHandler: DataHandlerService, // Facade for working with data
    private jwthelper: JwtHelperService,
    private dataService: DataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwthelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategoryes().subscribe((categories) => { this.categories = categories; });
    this.onSelectCategory(null); // Show all tasks
  }

  // Change the category
  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  // Remove category
  private onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;                                    // Открываем категорию "Все"
      this.onSearchCategory(null);
    });
  }

  // Update category
  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  private onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat()
    });
  }

  private onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(cat => {
      this.updateTasksAndStat()
    });
  }

  // Поиск задач
  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // Filter tasks by status (all, solved, unsolved)
  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  private onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Add a task
  private onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    });
  }

  private onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  private updateCategories() {
    this.dataHandler.getAllCategoryes().subscribe(categories => this.categories = categories)
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    })
  }

  // Shows tasks using all current conditions (category, search, filters, etc.)
  private updateTasksAndStat() {

    // Update the task list
    this.updateTasks();
    // Update variables for statistics
    this.updateStat();
  }

  // Update statistics
  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // Нужно для категории Все
      });
  }

  // Show hide statistics
  private toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }
}
