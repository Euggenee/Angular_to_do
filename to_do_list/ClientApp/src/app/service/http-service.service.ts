import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { map, find, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private instans: string = "https://localhost:44361/api";

  constructor(private http: HttpClient) { }

  //Creating a new user
  postNewUser(user: User) {
    const body = { name: user.name, email: user.email, password: user.password };
    return this.http.post(this.instans + "/user/", body, { observe: 'response' });
  }

  //Auth user
  postAuthUser(user: User) {
    const body = { email: user.email, password: user.password };
    return this.http.post(this.instans + "/auth/login", body, { observe: 'response' });
  }

  getUserId(id: number): Observable<any> {
    return this.http.get(this.instans + "/user/" + id, { observe: 'response' })
      .pipe(
        map((response) => {
          const user = response;
          const tasksResponse = (<any>response.body).tasks;
          const tasks = tasksResponse.map(function (task: any) {
            return {
              id: task.id,
              title: task.title,
              completed: task.completed,
              priority: task.priority,
              category: task.category,
              date: task.date,
            }
          })
          const categories = tasks.map(function (task: any) {
            return { category: task.category }
          });
          const priorities = tasks.map(function (task: any) {
            return { priority: task.priority }
          });
          return { tasks, categories, priorities };
        })
      )
  }
}




