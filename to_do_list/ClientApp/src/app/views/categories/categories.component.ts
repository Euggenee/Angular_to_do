import { Category } from 'src/app/model/category';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataHandlerService } from '../../service/data-handler.service';
import { MatDialog } from '@angular/material';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { OperType } from 'src/app/dialog/OperType';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CategoriesComponent implements OnInit {

  @Input()
  categories
  private inCategories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;
  private sc: Category;

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<string>();  // Passed string to search

  indexMouseMove: number;


  private searchCategoryTitle: string;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges(): void {
    this.inCategories = this.categories
  }

  ngOnInit() { }

  ngDoCheck(): void {
    if (this.inCategories != this.categories) {
      this.inCategories = this.categories;
      this.changeDetectorRef.markForCheck()
    }
  }

  public showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return
    }
    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  public showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  public openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'редактирование категорий', OperType.EDIT],
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
      if (typeof (result) === 'string') {
        category.title = result as string;
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  public openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, { data: ['', "Добавление категории", OperType.ADD], width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string);  // External handler
      }
    })
  }

  private search() {
    if (this.searchCategoryTitle == null) {
      return
    }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
