import { Priority } from './../../model/priority';
import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Task } from 'src/app/model/task';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';


@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})


export class EditTaskDialogComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [Task, string, OperType],
    private dataHeandler: DataHandlerService,
    private dialog: MatDialog) {
  }

  public categories: Category[];
  public priorities: Priority[];
  public dialogTitle: string;
  public task: Task;
  public date: Date;
  public operType: OperType; //Type of transaction

  public tmpTitle: string;
  public tmpCategory: Category;
  public tmpPpriority: Priority;
  public tmpDate: Date;

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPpriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataHeandler.getAllPriorities().subscribe(items => this.priorities = items);
    this.dataHeandler.getAllCategoryes().subscribe(items => this.categories = items);
  }

  public onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPpriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        massage: "Вы действительно хотите удалить задачу: '${this.task.title}'?"
      }, autoFocus: false, maxWidth: "500px"
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.dialogRef.close('delete'); }   // Иажали удалить
    });
  }

  public complete(): void {
    this.dialogRef.close('completed');
  }

  public activate() {
    this.dialogRef.close('activate');
  }

  public canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  public canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT
  }
}
