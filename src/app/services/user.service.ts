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

  getUserById(): Observable<IUser> {
    return this.http.get<IUser>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/me`
    );
  }
  getUserHobbyes(){
    return this.http.get<any>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/hobbyes`
    );
  }
  getUserOffices() {
    return this.http.get<any>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/offices`
    );
  }
  createUserHobbyes(body:any){
    return this.http.post(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/hobbyes`, body)
  }
  addUserHobbyes(name:string){
    const data = {
      name: name
    }
    return this.http.post(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/hobbyes`,data)
  }

  delUserHobbyes(id:any){
    return this.http.delete(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/hobbyes/${id}`,)
  }
  addUserOffices(name:string){
    const data = {
      name: name
    }
    return this.http.post(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/offices`,data)
  }
  delUserOffices(id:any){
    return this.http.delete(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/users/offices/${id}`,)
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
