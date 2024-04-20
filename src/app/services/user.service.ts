import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(this.getUserFromLocalStorage());

  constructor(private http: HttpClient) { }

  // getUser(): Observable<IUser | null> {
  //   return this.user.asObservable();
  // }
  setUser(user: IUser) {
    this.setUserToLocalStorage(user);
    this.user.next(user);
  }

  setUserToLocalStorage(user: IUser) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('auth_user') || 'null');
  }
  // Remove token
  removeUserFromLocalStorage() {
    localStorage.removeItem('auth_user');
    this.user.next(null);
  }

  // changeName(data: FormData): Observable<any> {
  //   // return this.http.post(`${environment.BACKEND_URL}:${environment.BACKEND_PORT}/api/profile/users`,{'new_name':data.get('new_name'), 'avatar':data.get('avatar')})
  //   return this.http.post<any>(
  //     `${environment.BACK_URL}:${environment.BACK_PORT}/api/profile/users`,
  //     data
  //   );
  // }

  // deleteUser() {
  //   return this.http.delete<any>(
  //     `${environment.BACK_URL}:${environment.BACK_PORT}/api/users`
  //   );
  // }
}
