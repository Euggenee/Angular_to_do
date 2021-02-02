import { Priority } from '../model/priority';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { OnInit, Injectable } from '@angular/core';
import { PriorityInterfase } from '../interface/priorityInterface';
import { HttpService } from './http-service.service';


@Injectable({
  providedIn: 'root'
})
export class PriorityImplemInterfaceService implements PriorityInterfase {

  constructor(private dataService: DataService, private httpService: HttpService) { }

  add(priority: Priority): Observable<Priority> {
    this.httpService.postNewPriority(priority).subscribe(() => {
      this.dataService.updateDataServicePriorities()
    })
    return of(priority);
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, this.dataService.priorities.map(priority => priority.id)) + 1;
  }

  get(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }

  delete(userId: number): Observable<Priority> {
    this.httpService.deletePriority(userId).subscribe(() => {
      this.dataService.updateDataServicePriorities()
    })
    return of();
  }

  update(priority: Priority): Observable<Priority> {
    this.httpService.putPriority(priority).subscribe(() => {
      this.dataService.updateDataServicePriorities();
      this.dataService.updateDataServiceTasks()
    })
    return of(priority);
  }

  getAll(): Observable<Priority[]> {
    return this.dataService.priorities$;
  }
}


