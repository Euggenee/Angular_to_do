import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';
import { UserApi } from 'src/app/api/user-api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  private showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>(); // Show / hide statistics

  constructor(private dialog: MatDialog, private userApi: UserApi) { }

  ngOnInit() { }

  private onToggleStat() {
    this.toggleStat.emit(!this.showStat); // Turn statistics on or off
  }

  // Settings window
  private showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });
    // No action required after closing the window
  }

  // User exit from the application implemented in auth-user.service
  private onSinOut() {
    this.userApi.signOut();
  }
}
