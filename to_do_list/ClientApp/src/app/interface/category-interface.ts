import { ICommon } from './common-interface';
import { Category } from 'src/app/model/category';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/model/priority';
import { Task } from "src/app/model/Task";
import { User } from 'src/app/model/user';



export interface ICategory extends ICommon<Category> {

  search(title: string): Observable<Category[]>;

}


