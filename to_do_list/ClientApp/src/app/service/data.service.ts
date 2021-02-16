import { Category } from '../model/category';
import { Priority } from '../model/priority';
import { Task } from "../model/Task";
import { Injectable, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpService } from './http-service.service';
import { User } from '../model/user';
import { find, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(private httpService: HttpService, private router: Router, ) { }

    public categories: Array<Category> = new Array;
    public categories$: BehaviorSubject<Category[]> = new BehaviorSubject(this.categories);
    public priorities: Array<Priority> = new Array;
    public priorities$: BehaviorSubject<Priority[]> = new BehaviorSubject(this.priorities);
    public tasks: Array<Task> = new Array;
    public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks);
    public user: User = new User;

    // Update user data after authenticating
    updateUserData() {
        this.updateDataServiceTasks()
        this.updateDataServicePriorities()
        this.updateDataServiceCategories()
    }

    updateDataServiceTasks() {
        let userId = localStorage.getItem("userId");
        this.httpService.getUserTasks(userId).subscribe((data) => {
            this.tasks = (<any>data);
            this.tasks$.next(this.tasks)
        }),
            (error) => { };
    }

    updateDataServicePriorities() {
        let userId = localStorage.getItem("userId");
        this.httpService.getUserPriorities(userId).subscribe((data) => {
            this.priorities = (<any>data)
            this.priorities$.next(this.priorities)
        }),
            (error) => { };
    }

    updateDataServiceCategories() {
        let userId = localStorage.getItem("userId");
        this.httpService.getUserCategories(userId).subscribe((data) => {
            this.categories = (<any>data);
            this.categories$.next(this.categories)
            this.router.navigate(['/authetincated']);
            // Fix it! there is no place for routes
        }),
            (error) => { };
    }
}
