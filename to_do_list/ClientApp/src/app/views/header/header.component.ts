import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';
import { UserApi } from 'src/app/api/user-api';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>(); // Show / hide statistics

  @Output()
  toggleMenu = new EventEmitter<boolean>()     //Show / hide menu categories

  private isMobiole: boolean;

  constructor(private dialog: MatDialog, private userApi: UserApi, private deviceDetector: DeviceDetectorService) {
    this.isMobiole = deviceDetector.isMobile();
  }

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

  private onToggleMenu() {
    this.toggleMenu.emit()
  }
}
