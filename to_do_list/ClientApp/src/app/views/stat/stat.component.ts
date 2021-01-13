import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})

// "presentational component": Displays the received data and sends any action to the handler
// Purpose - show statistics
export class StatComponent implements OnInit {

  @Input()
  totalTasksInCategory: number;  // Total number of tasks in the category

  @Input()
  completeTasksInCategory: number; // The number of solved problems in the category

  @Input()
  uncompleteTasksInCategory: number; // The number of unsolved problems in the category

  @Input()
  showStat: boolean;  // Show or hide statistics

  constructor() { }

  ngOnInit() { }


}
