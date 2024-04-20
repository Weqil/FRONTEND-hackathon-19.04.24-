import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MessagesAuth } from 'src/app/enums/message-auth';
import { MessagesErrors } from 'src/app/enums/message-error';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authservice: AuthService,
    private toastService: ToastService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  loginForm!: FormGroup;
  responseData: any;

  onLoading() {
    this.loadingService.showLoading();
    setTimeout(() => {
      this.loadingService.hideLoading();
    }, 5000);
  }

  onSubmitLogin() {
    console.log('log')
    this.loginForm.disable();
    this.loadingService.showLoading();
    this.authservice
      .login(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.tokenService.setToken(data.access_token);
          this.positiveResponseAfterLogin(data);
        },
        error: (err: any) => {
          this.errorResponseAfterLogin(err);
        },
      });
  }

  positiveResponseAfterLogin(data: any) {
    this.responseData = data;
    this.userService.setUser(this.responseData.user);
    this.loadingService.hideLoading();
    this.toastService.showToast(MessagesAuth.login, 'success');
    this.loginForm.reset();
    this.loginForm.enable();
    this.router.navigate(['home']);
  }
  
  errorResponseAfterLogin(err: any) {
    this.loadingService.hideLoading();
    this.toastService.showToast(
      err.error.message || MessagesErrors.default,
      'warning'
    );
    this.loginForm.enable();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnDestroy() {
    // отписываемся от всех подписок
    this.destroy$.next();
    this.destroy$.complete();
  }

}
