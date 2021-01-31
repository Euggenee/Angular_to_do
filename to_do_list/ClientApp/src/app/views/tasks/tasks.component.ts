import { Category } from 'src/app/model/category';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { EditTaskDialogComponent } from './../../dialog/edit-task-dialog/edit-task-dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DataHandlerService } from "../../service/data-handler.service";
import { Task } from "src/app/model/Task";
import { MatTableDataSource } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { Priority } from 'src/app/model/priority';
import { OperType } from 'src/app/dialog/OperType';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  //Container - data source for a table
  private dataSource: MatTableDataSource<Task>;

  // References to table components
  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>(); // Clicked on a category from the task list

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  addTask = new EventEmitter<Task>();

  // Current tasks to display on the page
  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory: Category;

  // Search
  private searchTaskText: string;                    // Current value for searching tasks
  private selectedStatusFilter: boolean = null;      // By default, tasks for all statuses (solved and unsolved) will be shown
  private selectedPriorityFilter: Priority = null;   // By default, tasks for all priorities will be shown

  // Fields for the table (those that display data from the task - must match the names of class variables)
  private displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private priorities: Priority[]; // Priority list (for filtering tasks)
  private tasks: Task[];
  private task: Task;

  constructor(
    private dataHandler: DataHandlerService, // Data access
    private dialog: MatDialog, // Working with the dialog box
  ) {
  }

  ngOnInit() {

    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    // Datasource must be created for the table, any source (database, arrays, JSON, etc.) is assigned to it
    this.dataSource = new MatTableDataSource();
    this.fillTable();                           // Fill tables with data (tasks) and all metadata
    this.onSelectCategory(null);
  }

  // Depending on the status of the task, return the color of the title
  private getPriorityColor(task: Task): string {

    // Color of the completed task
    if (task.complited) {
      return '#F8F9FA';                       // TODO convert colors to constants (magic strings, magic numbers)
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  // Shows tasks using all current conditions (category, search, filters, etc.)
  private fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    // Update the data source (since the data of the tasks array has been updated)
    this.dataSource.data = this.tasks;
    this.addTableObjects();


    // When we receive new data ..
    // So that you can sort by the "category" and "priority" columns, because there are not primitive types, but objects
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // What fields to sort by for each column
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title;
        }
      }
    };
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;               // Component for sorting data (if necessary)
    this.dataSource.paginator = this.paginator;     // Update the paging component (number of records, pages)
  }

  private openEditTaskDialog(task: Task): void {    // Dialog edit to add a task
    // Open a dialog box
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperType.EDIT],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      // Process the results  
      if (result === 'complete') {
        task.complited = true;              // Set the status of the task as completed   
        this.updateTask.emit(task);
      }

      if (result === 'activate') {
        task.complited = false;             // return the task status as incomplete
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {                          // If you clicked OK and there is a result
        this.updateTask.emit(task);
        return;
      }

    });
  }

  // delete confirmation dialog
  private openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {                                        // If you clicked OK
        this.deleteTask.emit(task);
      }
    });
  }

  private onToggleStatus(task: Task) {
    task.complited = !task.complited;
    this.updateTask.emit(task);
  }

  private onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  private onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  private onFilterByStatus(value: boolean) {
    // Just in case, we check if the value has changed (although the UI component itself must do this)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  private onFilterByPriority(value: Priority) {
    // Just in case, we check if the value has changed (although the UI component itself must do this)
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  // dialog box for adding a task
  private openAddTaskDialog() {
    // same as editing, but passing in an empty Task object
    this.task = new Task('', false, null, null, null, null);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [this.task, 'Добавление задачи', OperType.ADD] });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // if you clicked OK and there is a result
        this.addTask.emit(this.task);
      }
    });

  }

}






