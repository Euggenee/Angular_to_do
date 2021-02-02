import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { Priority } from './../../model/priority';
import { EditPriorityDialogComponent } from './../../dialog/edit-priority-dialog/edit-priority-dialog.component';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { EditCategoryDialogComponent } from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import { MatDialog } from '@angular/material';
import { OperType } from 'src/app/dialog/OperType';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PrioritiesComponent implements OnInit {
  static colorDrfault = '#fff'

  @Input()
  private priorities: [Priority];

  // Removed
  @Output()
  deletePriority = new EventEmitter<Priority>();

  // Changed
  @Output()
  updatePriority = new EventEmitter<Priority>();

  // Added
  @Output()
  addPriority = new EventEmitter<Priority>();

  // To open a new dialog box (from the current one)))
  constructor(private dialog: MatDialog) { };

  ngOnInit() { };

  private onEditPrioriry(priority: Priority) {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, { data: [priority.title, 'Редактирование приоритета', OperType.EDIT] })
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') {
        this.deletePriority.emit(priority);
        return;
      }
      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    })
  }

  private openAddPriorityDialog() {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, { data: [" ", 'Добвление приоритета', OperType.ADD], width: '400px' })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const title = result as string;
        const userId = parseInt(localStorage.getItem("userId"));
        const priority = new Priority(title, PrioritiesComponent.colorDrfault, userId)
        this.addPriority.emit(priority);
      }
    })
  }

  private delete(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { dialogTitle: 'Подтвердите действие', messeage: 'Вы действительно хотите удалить' }, autoFocus: false })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority)
      }
    })
  }

}

