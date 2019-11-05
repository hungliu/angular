import { Injectable  } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiUrl  } from '../Constant/ApiUrl';
import {IUser} from '../Interface/IUser';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
// import 'rxjs/add/Operator/catch/';
// import 'rxjs/add/observable/throw';
// import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(ApiUrl.getUserData);
  }
  
  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(ApiUrl.getUserData);
  }
  // errorHandler(error: HttpErrorResponse) {
  //     return Observable.throw( error.message || 'Error');
  // }
}
