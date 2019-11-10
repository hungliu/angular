import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { ApiUrl } from "../Constant/ApiUrl";
import { IUser } from "../Interface/IUser";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";

import { User } from "../Models/User";
import { filter } from "minimatch";
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

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
      .pipe(map(data => data.map(User.adap)));
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${ApiUrl.getUserData}?id=${id}`);
  }

  addUser(user: any): Observable<IUser> {
    return this.http.post<IUser>(ApiUrl.getUserData, user);
  }

  updateUser(user: IUser): Observable<IUser> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    //return this.http.put(`${ApiUrl.getUserData}?id=${user.id}`, JSON.stringify(user))
    return this.http.put<IUser>(
      `${ApiUrl.getUserData}?id=${user.id}`,
      JSON.stringify(user)
    );
  }
}
