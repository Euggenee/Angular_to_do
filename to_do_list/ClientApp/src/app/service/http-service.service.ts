import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { map, find, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { Task } from '../model/Task';
import { Priority } from '../model/priority';
import { CategoriesComponent } from '../views/categories/categories.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private instans: string = "https://localhost:44361/api";
  private userParams = new HttpParams;

  constructor(private http: HttpClient) { }

  //CATEGORY

  //Creating a new user
  postNewUser(user: User) {
    const body = { name: user.name, email: user.email, password: user.password };
    return this.http.post(this.instans + "/user/", body, { observe: 'response' });
  }

  //Creating a new Category
  postAddCategory(category: Category) {
    const body = { title: category.title, userId: category.userId };
    return this.http.post(this.instans + "/category/add", body, { observe: 'response' });
  }

  //Getting user Categories
  getUserCategories(userId: string) {
    let params = new HttpParams()
    params = params.append('userId', userId)
    return this.http.get(this.instans + "/category", { params: params, observe: 'response' }).pipe(
      map((response) => {
        const categories = response.body;
        return categories
      })
    );
  }

  //Chenges Category
  putCategory(category: Category) {
    const body = { id: category.id, title: category.title, userId: category.userId }
    return this.http.put(this.instans + "/category/change", body, { observe: 'response' });
  }

  //Delete Category by id
  deleteCategory(categoryId) {
    return this.http.delete(this.instans + "/category/" + categoryId, { observe: 'response' });
  }

  //Getting user Tasks
  getUserTasks(userId: string) {
    let params = new HttpParams()
    params = params.append('userId', userId)
    return this.http.get(this.instans + "/task", { params: params, observe: 'response' }).pipe(
      map((response) => {
        const tasks = response.body;
        return tasks
      })
    );
  }

  //TASK

  //Update task
  putUpdateTask(task: Task, userId: number) {
    const body = { id: task.id, title: task.title, complited: task.complited, category: task.category, priority: task.priority, date: task.date, userId }
    return this.http.put(this.instans + "/task/change", body, { observe: "response" })
  }

  // Add new task
  postNewTask(task: Task, complited: boolean, userId: number) {
    const body = { title: task.title, complited: complited, priority: task.priority, category: task.category, date: task.date, userId: userId }
    return this.http.post(this.instans + "/task/add", body, { observe: 'response' })
  }

  //Delete task
  deleteTask(taskId) { return this.http.delete(this.instans + "/task/" + taskId) }

  //PRIORITY

  //Getting user Priorities
  getUserPriorities(userId: string) {
    let params = new HttpParams()
    params = params.append('userId', userId)
    return this.http.get(this.instans + "/priority", { params: params, observe: 'response' }).pipe(
      map((response) => {
        const priorities = response.body;
        return priorities
      })
    );
  }

  //Delete Priority by id
  deletePriority(userId: number) {
    return this.http.delete(this.instans + "/priority/" + userId, { observe: 'response' })
  }

  //Chenges Priority
  putPriority(priority: Priority) {
    const body = { id: priority.id, title: priority.title, color: priority.color, userId: priority.userId }
    return this.http.put(this.instans + "/priority/change", body, { observe: 'response' })
  }

  //Add new Priority
  postNewPriority(priority: Priority) {
    const body = { title: priority.title, userId: priority.userId }
    return this.http.post(this.instans + "/priority/add", body, { observe: 'response' })
  }

  //Auth user
  postAuthUser(user: User) {
    const body = { email: user.email, password: user.password };
    return this.http.post(this.instans + "/auth/login", body, { observe: 'response' });
  }

  //Get user by id
  getUserId(id: number): Observable<any> {
    return this.http.get(this.instans + "/user/" + id, { observe: 'response' }).pipe(
      map((response) => {
        const user = response.body;
        return { user };
      })
    )
  }
}




