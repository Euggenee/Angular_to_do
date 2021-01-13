
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataHandlerService } from '../../service/data-handler.service';
import { Priority } from '../../model/Priority';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})

// Application settings dialog box
// since settings are not tied to other components (windows),
// then it can independently load the necessary data using dataHandler (and not receive it using @Input)

export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
  }

  // Clik close
  private onClose() {
    this.dialogRef.close(false)
  }

  private onAddPriority(priority: Priority) {
    this.dataHandler.addPriority(priority).subscribe();
  }

  private onDeletePriority(priority) {
    this.dataHandler.deltePriority(priority).subscribe();
  }

  private onUpdatePriority(priority) {
    this.dataHandler.updatePrioriry(priority).subscribe();
  }
}
