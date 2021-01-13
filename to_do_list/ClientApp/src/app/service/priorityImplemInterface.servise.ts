import { Priority } from '../model/priority';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { OnInit, Injectable } from '@angular/core';
import { PriorityInterfase } from '../interface/priorityInterface';


@Injectable({
  providedIn: 'root'
})
export class PriorityImplemInterfaceService implements PriorityInterfase {

  constructor(private dataService: DataService) { }

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    this.dataService.priorities.push(priority);
    return of(priority);
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, this.dataService.priorities.map(priority => priority.id)) + 1;
  }

  get(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Priority> {
    // Before deleting - you need to nullify all references to the deleted value in tasks
    // в реальной БД сама обновляет все ссылки (cascade update) исправить после написания бекенд
    this.dataService.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });
    // Delete by id
    const tmpPriority = this.dataService.priorities.find(t => t.id === id);
    this.dataService.priorities.splice(this.dataService.priorities.indexOf(tmpPriority), 1);
    return of(tmpPriority);
  }

  // Update by id
  update(priority: Priority): Observable<Priority> {
    const tmp = this.dataService.priorities.find(t => t.id === priority.id);
    this.dataService.priorities.splice(this.dataService.priorities.indexOf(tmp), 1, priority);
    return of(priority);
  }

  getAll(): Observable<Priority[]> {
    return of(this.dataService.priorities);
  }
}


// delete(id: number): Observable<Task> {
//   const taskTmp = TestData.tasks.find(t => t.id === id);     //удаляем по id
//   TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
//   return of(taskTmp);
// }

