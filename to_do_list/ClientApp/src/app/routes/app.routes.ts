import { SingInComponent } from './../dialog/sing-in/sing-in.component';
import { RegisterComponent } from '../dialog/register/register.component';
import { RouterModule, Route, Routes } from "@angular/router";
import { HomeComponent } from '../views/home/home.component';
import { AuthenticatedComponent } from '../views/authenticated/authenticated.component';
import { AuthGuardService } from '../service/auth-guard.service';


export const appRoutes: Routes = [

  { path: 'sing-in', component: SingInComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'authetincated', component: AuthenticatedComponent, canActivate: [AuthGuardService], children: [
      { path: '', canActivateChild: [AuthGuardService], children: [{ path: 'home', component: HomeComponent }] }
    ]
  },
  { path: '', redirectTo: 'sing-in', pathMatch: 'full' },
  { path: '**', component: SingInComponent }

]


