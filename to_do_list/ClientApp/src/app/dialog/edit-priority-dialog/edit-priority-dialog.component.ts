import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from "../OperType";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})

// Cоздание/редактирование категории
export class EditPriorityDialogComponent implements OnInit {

  private dialogTitle: string;   // Text for the dialog box
  private priorityTitle: string; // Text for the name of the priority (when reacting or adding)
  private operType: OperType;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,      // To be able to work with the current dialog. window
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // The data that was passed to the dialog
    private dialog: MatDialog // To open a new dialog box (from the current one) - for example, to confirm deletion
  ) {
  }

  ngOnInit() {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }

  // Clicked OK
  private onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  // Clicked cancel (save nothing and close the window)
  private onCancel(): void {
    this.dialogRef.close(false);
  }

  // Clicked Delete
  private delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        massege: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задачи проставится '')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }

  // private canDelete(): boolean {
  //   return this.operType == OperType.EDIT;
  // }
}
