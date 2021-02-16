import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent implements OnInit {

  private dialogTitle: string;
  private massege: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, massege: string }) {

    this.dialogTitle = data.dialogTitle;  // Title
    this.massege = data.massege;          //Message
  }

  ngOnInit() { }

  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  public onCansel(): void {
    this.dialogRef.close(false);
  }
}
