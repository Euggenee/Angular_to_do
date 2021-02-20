import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Route, Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CategoriesComponent } from "./views/categories/categories.component";
import { TasksComponent } from "./views/tasks/tasks.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { TaskDatePipe } from './pipe/task-date.pipe';
import { registerLocaleData } from '@angular/common'
import localeRu from '@angular/common/locales/ru';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './views/footer/footer.component';
import { AboutDialogComponent } from './dialog/about/about.dialog.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component';
import { StatCardComponent } from './views/stat/stat-card/stat-card.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';
import { SingInComponent } from './dialog/sing-in/sing-in.component';
import { RegisterComponent } from './dialog/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';
import { appRoutes } from './routes/app.routes';
import { AuthenticatedComponent } from './views/authenticated/authenticated.component';
import { AuthGuardService } from './service/auth-guard.service';
//import { AuthUserService } from './service/auth-user.service';
import { UserApi } from './api/user-api';
import { HttpService } from './service/http-service.service';
import { JwtModule } from '@auth0/angular-jwt'
import { DataService } from './service/data.service';
import { TaskService } from './service/task.service';
import { PriorityService } from './service/priority.servise';
import { CategoryService } from './service/category.service';
import { AuthUserService } from './service/auth-user.service';
import { SidebarModule } from 'ng-sidebar';
import { DeviceDetectorService } from 'ngx-device-detector';




export function tokenGetter() {
  return localStorage.getItem("jwt")
}

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    PrioritiesComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent,
    SingInComponent,
    RegisterComponent,
    HomeComponent,
    AuthenticatedComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
    SidebarModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
  ],

  providers: [
    HttpService,
    AuthGuardService,
    AuthUserService,
    { provide: UserApi, useExisting: AuthUserService },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'auto' } },
    DataService,
    TaskService,
    PriorityService,
    CategoryService,
    DeviceDetectorService
  ],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    AboutDialogComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent

  ],
  bootstrap: [AppComponent,],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }
