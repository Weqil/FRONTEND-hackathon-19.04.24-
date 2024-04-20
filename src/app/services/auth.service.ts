import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Observable,
  mergeMap,
  BehaviorSubject,
  ReplaySubject,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
import { ToastService } from './toast.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { MessagesAuth } from '../enums/message-auth';
import { PasswordReset } from '../models/password-reset';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  isAuthenticated(): boolean {
    let token = this.tokenService.getToken();
    let user = this.userService.getUserFromLocalStorage();
    if (token && user) {
      //return this.authenticationState.next(true)
      this.authenticationState.next(true);
      return true;
    } else {
      //return this.authenticationState.next(false)
      this.authenticationState.next(false);
      return false;
    }
    // return token && user ? true : false
  }

  getAuthState() {
    this.isAuthenticated();
    return this.authenticationState.value;
    // console.log('this.authenticationState '+ this.authenticationState)
    // return this.authenticationState

    // return this.authenticationState.subscribe(state => {
    //   return state
    // })
  }

  private getCSRF(): Observable<string> {
    return this.http.get<string>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/sanctum/csrf-cookie`
    );
  }

  login(user: IUser): Observable<IUser> {

        return this.http.post<IUser>(
          `${environment.BACK_URL}:${environment.BACK_PORT}/api/login`,
          user
        );
  }

  register(data: any) {
    return this.http.post<any>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/register`,
      data
    );
  }

  logout() {
    this.tokenService.removeToken();
    this.userService.removeUserFromLocalStorage();
    this.authenticationState.next(false);
    this.router.navigate(['login']);
    this.toastService.showToast(MessagesAuth.logout, 'secondary');
  }
}
