//import { TestBed } from '@angular/core/testing';
import { Category } from 'src/app/model/category';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Injectable, OnInit } from '@angular/core';
import { CategoryInterfase } from '../interface/categoryInterface';


@Injectable({
  providedIn: 'root'
})
export class CategoryImplemInterfaceService implements CategoryInterfase {

  constructor(private dataService: DataService) { }



  search(title: string): Observable<Category[]> {
    return of(this.dataService.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  add(category: Category): Observable<Category> {
    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory();
    }
    this.dataService.categories.push(category);
    return of(category);
  }

  private getLastIdCategory(): number {
    return Math.max.apply(Math, this.dataService.categories.map(c => c.id)) + 1;
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Category> {
    this.dataService.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const tmpCategory = this.dataService.categories.find(t => t.id === id);
    this.dataService.categories.splice(this.dataService.categories.indexOf(tmpCategory), 1);
    return of(tmpCategory);
  }


  update(category: Category): Observable<Category> {
    const tmpCategory = this.dataService.categories.find(t => t.id === category.id);
    this.dataService.categories.splice(this.dataService.categories.indexOf(tmpCategory), 1, category);
    return of(tmpCategory);
  }


  getAll(): Observable<Category[]> {

    return of(this.dataService.categories);
  }



}
