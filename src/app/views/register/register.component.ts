import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();
  
  constructor(
    private loadingService: LoadingService,
    private authservice: AuthService,
    private toastService: ToastService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  registerForm!: FormGroup;
  companyWorker:string = 'company'

  onSubmitReg() {
    this.loadingService.showLoading();
    this.authservice.register(this.registerForm.value)
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
    )
    .subscribe((response: any) => {

    })
  }

  changeType(event:any){
    this.companyWorker = event.detail.value
  }

  loginAfterSocial(token: any) {
    if (token.length >= 47) {
      this.tokenService.setToken(token);
      // this.registerForm.disable()
      this.loadingService.showLoading();
      this.userService
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
    // this.registerForm.reset()
    // this.registerForm.enable()
    // this.router.navigate(['cabinet']);
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
    });
  }

}
