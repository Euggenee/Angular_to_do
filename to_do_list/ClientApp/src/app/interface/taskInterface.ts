
import { CommonInterface } from "./commonInterface";
import { Task } from "src/app/model/task";
import { Observable } from "rxjs";
import { Priority } from 'src/app/model/priority';
import { OnInit } from '@angular/core';
import { Category } from "../model/category";


export interface TaskInterfase extends CommonInterface<Task> {



  //Поиск задачь по всем параметрам
  // если какой либо парам равен null  он не учит при поиске

  search(category: Category, search: string, status: boolean, priority: Priority): Observable<Task[]>;


  getComplitedCountInCategory(category: Category): Observable<number>;


  getUncomplitedCountInCategory(category: Category): Observable<number>;


  getTotalCountInCategory(category: Category): Observable<number>;


  getTotalCount(): Observable<number>;

}
