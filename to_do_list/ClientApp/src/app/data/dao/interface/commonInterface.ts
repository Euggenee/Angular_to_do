import { Observable, BehaviorSubject } from "rxjs";


export interface CommonInterface<T> {


  add(T): Observable<T>;

  get(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(T): Observable<T>;

  getAll(): Observable<T[]>;


}
