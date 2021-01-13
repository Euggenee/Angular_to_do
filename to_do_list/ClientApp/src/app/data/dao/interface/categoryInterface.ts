import { CommonInterface } from './commonInterface';
import { Category } from 'src/app/model/category';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/model/priority';
import { Task } from 'src/app/model/task';
import { User } from 'src/app/model/user';



export interface CategoryInterfase extends CommonInterface<Category> {



  search(title: string): Observable<Category[]>;

}


