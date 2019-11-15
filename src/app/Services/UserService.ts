import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ApiUrl } from '../Constant/ApiUrl';
import { IUser } from '../Interface/IUser';
import { Observable, of } from 'rxjs';
import { delay, map, tap, catchError } from 'rxjs/operators';
import { User } from '../Models/User';

const delayTime = 500;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUserList(pageIndex: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${ApiUrl.getUserData}?_limit=${pageSize}&_page=${pageIndex}&_sort=createdAt&_order=desc`
    );
  }

  getListUserWithAdap(pageIndex: number, pageSize: number): Observable<User[]> {
    return this.http
      .get<User[]>(
        `${ApiUrl.getUserData}?_limit=${pageSize}&_page=${pageIndex}&_sort=createdAt&_order=desc`
      )
      .pipe(
        delay(delayTime),
        map(data => data.map(User.adap))
      );
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${ApiUrl.getUserData}?id=${id}`);
  }

  addUser(user: any): Observable<IUser> {
    return this.http.post<IUser>(ApiUrl.getUserData, user);
  }

  updateUser(user: User): Observable<User> {
    const htpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log('update ID: ' + user.id);
    return this.http.put(`${ApiUrl.getUserData}/${user.id}`, user, htpOptions).pipe(
      tap(updateUser => console.log('update item: ' + JSON.stringify(user))),
      catchError(err => of(err))
    );
  }

  searchUser(name: string, pageIndex: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${ApiUrl.getUserData}?q=${name}&_limit=${pageSize}&_page=${pageIndex}&_sort=createdAt&_order=desc`);
  }
}
