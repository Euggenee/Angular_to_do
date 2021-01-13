import { Observable } from "rxjs"
import { User } from "../model/user";

export abstract class UserApi {
    signIn: (user: User) => Observable<any>;
    signOut: () => Observable<any>;
}