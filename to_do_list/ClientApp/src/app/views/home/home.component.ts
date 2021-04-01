import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Task } from "src/app/model/Task";
import { Category } from "src/app/model/category";
import { Priority } from "src/app/model/priority";
import { zip } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from "src/app/service/data.service";
import { TaskService } from "src/app/service/task.service";
import { PriorityService } from "src/app/service/priority.servise";
import { CategoryService } from "src/app/service/category.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { List, fromJS } from "immutable";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default
  //Fix it pass data by changing the link and using the immutable js library, use ChangeDetectionStrategy.onPush
})

export class HomeComponent implements OnInit {

  title = 'Todo';
  tasks: Task[];
  categories: Array<Category> = new Array // All categories
  priorities: Array<Priority> = new Array // All priorities

  // Statistics
  totalTasksCountInCategory: number;
  completedCountInCategory: number;
  uncompletedCountInCategory: number;
  uncompletedTotalTasksCount: number;
  showStat = false;

  selectedCategory: Category = null;

  // Search
  searchTaskText = ''; // Current value for searching tasks

  // Filtering
  priorityFilter: Priority;
  statusFilter: boolean;
  searchCategoryText: string;

  // Menu
  menuOpened: boolean; // open close
  menuMode: string; // type of extension (overhead, pushing, etc.)
  menuPosition: string; // side
  showBackdrop: boolean; // show background dimming or not

  // Type device
  isMobile: boolean;
  isTablet: boolean;

  constructor(
    private jwthelper: JwtHelperService,
    private dataService: DataService,
    private taskService: TaskService,
    private priorityService: PriorityService,
    private categoryService: CategoryService,
    private deviceService: DeviceDetectorService,
    private changeDetectorRef: ChangeDetectorRef
  ) {


    // define the type of request
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
    this.showStat = true ? !this.isMobile : false; // if mob. device, then by default do not show statistics
    // set menu settings
    this.setMenuValues();
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
    this.dataService.updateUserData();
    this.taskService.getAll().subscribe(tasks => this.tasks = tasks);
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  // Change the category
  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasksAndStat();
  }

  // Remove category
  private onDeleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(cat => {
      this.selectedCategory = null;                                    // Открываем категорию "Все"
      this.onSearchCategory(null);
    });
  }

  // Update category
  private onUpdateCategory(category: Category) {
    this.categoryService.update(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  private onUpdateTask(task: Task) {
    this.taskService.update(task).subscribe(cat => {
      this.updateTasksAndStat()
    });
  }

  private onDeleteTask(task: Task) {
    this.taskService.delete(task.id).subscribe(cat => {
    });
    if (this.selectedCategory != null) {
      this.selectedCategory = task.category
      this.updateTasksAndStat()
    }
    else {
      this.updateTasksAndStat()
    }
  }

  // Search for tasks
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
    this.taskService.search(this.selectedCategory, this.searchTaskText, this.statusFilter, this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // Add a task
  private onAddTask(task: Task) {
    this.taskService.add(task).subscribe(result => {
    });
  }

  private onAddCategory(title: string) {
    const userId = parseInt(localStorage.getItem("userId"))
    const category = new Category(title, userId)
    this.categoryService.add(category);
  }

  private updateCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories)
  }

  private onSearchCategory(title: string) {
    this.searchCategoryText = title;
    this.categoryService.search(title).subscribe(categories => {
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
      this.taskService.getTotalCountInCategory(this.selectedCategory),
      this.taskService.getComplitedCountInCategory(this.selectedCategory),
      this.taskService.getUncomplitedCountInCategory(this.selectedCategory),
      this.taskService.getUncomplitedCountInCategory(null))
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // Needed for the All category
      });
  }

  // Show hide statistics
  private toggleStat(showStat: boolean) {
    this.showStat = showStat;
  }

  // If you closed the menu in any way - set the value to false
  private onClosedMenu() {
    this.menuOpened = false;
  }

  // Menu options
  private setMenuValues() {
    this.menuPosition = 'left'; // left menu
    // side menu settings for mob. and desktop options
    if (this.isMobile) {
      this.menuOpened = false; // on mob. by default the menu will be closed
      this.menuMode = 'over'; // on top of all content
      this.showBackdrop = true; // show dark background or not (needed for mobile version)
    } else {
      this.menuOpened = true; // NOT in mob. the default version will open the menu (because there is enough space)
      this.menuMode = 'push'; // will "push" the main content, not close it
      this.showBackdrop = false; // show dark background or not
    }
  }

  // Show-hide menu
  private toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
