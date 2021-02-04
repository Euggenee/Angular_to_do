//import { TestBed } from '@angular/core/testing';
import { Category } from 'src/app/model/category';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Injectable, OnInit } from '@angular/core';
import { ICategory } from '../interface/category-interface';
import { HttpService } from './http-service.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategory {

  constructor(private dataService: DataService, private httpService: HttpService) { }

  search(title: string): Observable<Category[]> {
    return of(this.dataService.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)));
  }

  add(category: Category): Observable<Category> {
    this.httpService.postAddCategory(category).subscribe((category) => {
      this.dataService.updateDataServiceCategories();
    });
    return of(category)
  }

  get(id: number): Observable<Category> {
    throw new Error("Method not implemented.");
  }

  delete(categoryId: number): Observable<Category> {
    this.httpService.deleteCategory(categoryId).subscribe(() => {
      this.dataService.updateDataServiceCategories()
      this.dataService.updateDataServiceTasks()
    })
    return of();
  }

  update(category: Category): Observable<Category> {
    this.httpService.putCategory(category).subscribe(() => {
      this.dataService.updateDataServiceCategories();
    })
    return of(category);
  }

  getAll(): Observable<Category[]> {
    return this.dataService.categories$
  }
}
