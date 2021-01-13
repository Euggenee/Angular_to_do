import { Injectable } from '@angular/core';
import { UserApi } from '../api/user-api';
import { Observable, of, throwError, from } from 'rxjs';
import { delay } from 'rxjs/operators'
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticatedComponent } from '../views/authenticated/authenticated.component';


@Injectable({ providedIn: 'root' })
export class AuthUserService {

    isAuthenticated: boolean;
    invalidLogin: boolean;

    private instans: string = "https://localhost:44361/api";

    constructor(private router: Router, private http: HttpClient) { }

    // Fix it! this function is temporarily implemented in the sing-in component  
    signIn(user: User) {
        return of();
    }

    //Called in HeaderComponent
    signOut() {
        localStorage.removeItem("jwt");
        this.router.navigate(['/sing-in']);

    }
}







