
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Priority } from '../../model/Priority';
import { PriorityService } from 'src/app/service/priority.servise';

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
    private priorityService: PriorityService) {
  }

  ngOnInit() {
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities)
  }

  // Clik close
  private onClose() {
    this.dialogRef.close(false)
  }

  private onAddPriority(priority: Priority) {
    this.priorityService.add(priority).subscribe();
  }

  private onDeletePriority(priority: Priority) {
    this.priorityService.delete(priority.id).subscribe();
  }

  private onUpdatePriority(priority: Priority) {
    this.priorityService.update(priority).subscribe();
  }
  private onUpdatePriorityColor(priority: Priority) {


  }
}
