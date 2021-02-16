
import { ICommon } from "./common-interface";
import { Task } from "src/app/model/Task";
import { Observable } from "rxjs";
import { Priority } from 'src/app/model/priority';
import { OnInit } from '@angular/core';
import { Category } from "../model/category";


export interface ITask extends ICommon<Task> {

  //Поиск задачь по всем параметрам
  // если какой либо парам равен null  он не учит при поиске

  search(category: Category, search: string, status: boolean, priority: Priority): Observable<Task[]>;

  getComplitedCountInCategory(category: Category): Observable<number>;

  getUncomplitedCountInCategory(category: Category): Observable<number>;

  getTotalCountInCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;
}
