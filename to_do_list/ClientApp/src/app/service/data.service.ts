import { Category } from '../model/category';
import { Priority } from '../model/priority';
import { Task } from '../model/task';
import { Injectable, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http-service.service';
import { User } from '../model/user';
import { find } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor(private httpService: HttpService, private router: Router, ) { }

    public categories: Array<Category> = new Array;
    public priorities: Array<Priority> = new Array;
    public tasks: Array<Task> = new Array;
    public user: User = new User;

    // Update user data after authenticating
    updateUserData() {
        const userId: any = localStorage.getItem("userId");
        this.httpService.getUserId(<number>userId)
            .subscribe((data) => {
                this.tasks = data.tasks;
                this.categories = data.categories;
                this.priorities = data.priorities;
                // Fix it! there is no place for routes
                this.router.navigate(['/authetincated']);
            }),
            (error) => {
            }
    }
}









    // static categories: Category[] = [
    //     { id: 1, title: 'Работа' },
    //     { id: 2, title: 'Семья' },
    //     { id: 3, title: 'Учеба' },
    //     { id: 4, title: 'Отдых' },
    //     { id: 5, title: 'Спорт' },
    //     { id: 6, title: 'Еда' },
    //     { id: 7, title: 'Финансы' },
    //     { id: 8, title: 'Гаджеты' },
    //     { id: 9, title: 'Здоровье' },
    //     { id: 10, title: 'Автомобиль' }
    // ];


    // static priorities: Priority[] = [
    //     { id: 1, title: 'Низкий', color: '#e5e5e5' },
    //     { id: 2, title: 'Средний', color: '#85D182' },
    //     { id: 3, title: 'Высокий', color: '#F1828D' },
    //     { id: 4, title: 'Очень срочьно!', color: '#F1128D' },
    // ];


    // static tasks: Task[] = [
    //     {
    //         id: 1,
    //         title: 'asdfasdfasd',
    //         priority: DataService.priorities[2],
    //         completed: false,
    //         category: DataService.categories[9],
    //         date: new Date('2019-04-10')
    //     },
    //     {
    //         id: 2,
    //         title: 'nyntyunt',
    //         priority: DataService.priorities[4],
    //         completed: true,
    //         category: DataService.categories[3],
    //         date: new Date('2019-05-10')
    //     },
    //     {
    //         id: 3,
    //         title: 'ghnghnfghfgnfghnfg',
    //         priority: DataService.priorities[1],
    //         completed: false,
    //         category: DataService.categories[1],
    //         date: new Date('2019-06-10')
    //     },
    //     {
    //         id: 4,
    //         title: 'hmhjmghjmghj',
    //         priority: DataService.priorities[4],
    //         completed: true,
    //         category: DataService.categories[7],
    //         date: new Date('2019-05-10')
    //     },
    //     {
    //         id: 5,
    //         title: 'dfgdfgsdfg',
    //         priority: DataService.priorities[1],
    //         completed: false,
    //         category: DataService.categories[5],
    //         date: new Date('2019-05-10')
    //     },
    //     {
    //         id: 6,
    //         title: 'rrereterterter',
    //         priority: DataService.priorities[3],
    //         completed: false,
    //         category: DataService.categories[3],
    //         date: new Date('2019-03-10')
    //     },
    //     {
    //         id: 7,
    //         title: 'asvdfssfsvfs',
    //         priority: DataService.priorities[3],
    //         completed: false,
    //         category: DataService.categories[3],
    //         date: new Date('2019-03-10')
    //     },
    //     {
    //         id: 8,
    //         title: 'asdfasdfasd',
    //         priority: DataService.priorities[1],
    //         completed: false,
    //         category: DataService.categories[10],
    //     },
    //     {
    //         id: 9,
    //         title: 'asdfasdfasd',
    //         priority: DataService.priorities[2],
    //         completed: false,
    //         category: DataService.categories[4],
    //         date: new Date('2019-04-10')
    //     },
    // ];

