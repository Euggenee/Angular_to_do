import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})

// Create / edit a category
export class EditCategoryDialogComponent implements OnInit {

  public dialogTitle: string; // Text for the dialog box
  public categoryTitle: string; // Text for the category name (when reacting or adding)
  private operType: OperType; //Type of transaction

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>, // To work with the current dialog. window
    @Inject(MAT_DIALOG_DATA) public data: [string, string, OperType], // The data that was passed to the dialog
    public dialog: MatDialog // To open a new dialog box (from the current one) - for example, to confirm deletion
  ) {
  }

  ngOnInit() {

    // Get the data passed to the dialog box
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];

  }

  // Clicked OK
  public onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  // Clicked cancel (save nothing and close the window)
  public onCancel() {
    this.dialogRef.close(false);
  }

  // Clicked Delete
  public delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // Clicked delete
      }
    });
  }

  public canDelete(): boolean {
    return this.operType === OperType.EDIT
  }
}


