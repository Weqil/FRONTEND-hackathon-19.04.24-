import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authservice: AuthService,
    private toastService: ToastService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  registerFormUser!: FormGroup;
  registerFormOrg!: FormGroup;
  companyWorker:string = 'company'

  onSubmitReg() {
    this.loadingService.showLoading();
    if (this.companyWorker == 'company') {
      this.registerFormOrg.controls['company'].patchValue({name: this.registerFormOrg.value.name})
      this.authservice.register(this.registerFormOrg.value)
      .pipe(
        map((response: any) => {
          this.toastService.showToast(
            'Вы успешно зарегестрировались как компания!!!',
            'success'
          );
          response.access_token
                  ? this.loginAfterSocial(response.access_token)
                  : this.loginAfterSocial('no');
          this.loadingService.hideLoading();
        }),
        catchError(err => {
          console.log(err)
          this.loadingService.hideLoading();
          this.toastService.showToast(err.error.message, 'warning');
          return of(EMPTY);
        }),
      )
      .subscribe()
    } else {
      this.authservice.register(this.registerFormUser.value)
      .pipe(
        map((response: any) => {
          this.toastService.showToast(
            'Вы успешно зарегестрировались!!!',
            'success'
          );
          response.access_token
                  ? this.loginAfterSocial(response.access_token)
                  : this.loginAfterSocial('no');
          this.loadingService.hideLoading();
        }),
        catchError(err => {
          console.log(err)
          this.loadingService.hideLoading();
          this.toastService.showToast('Авторизация неудачна', 'warning');
          return of(EMPTY);
        }),
      )
      .subscribe()
    }
  }

  changeType(event:any){
    this.companyWorker = event.detail.value
  }

  async loginAfterSocial(token: any) {
    if (token.length >= 47) {
      await this.tokenService.setToken(token);
      // this.registerForm.disable()
      this.loadingService.showLoading();
      await this.userService
        .getUserById()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.positiveResponseAfterLogin(data);
          },
          error: () => {
            this.loadingService.hideLoading();
          },
        });
    }
  }

  positiveResponseAfterLogin(data: any) {
    this.userService.setUser(data.user);
    this.loadingService.hideLoading();
    this.registerFormUser.reset()
    this.registerFormUser.enable()
    this.registerFormOrg.reset()
    this.registerFormOrg.enable()
    this.router.navigate(['cabinet']);
  }

  ngOnInit() {
    this.registerFormUser = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      register_as: new FormControl('user', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl('' , [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      code:  new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      about: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ]),
    });
    this.registerFormOrg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      register_as: new FormControl('company', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      company: new FormControl(
        new FormGroup({
          name: new FormControl('' , [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ]),
        }),
        Validators.required),
    });
  }

}
