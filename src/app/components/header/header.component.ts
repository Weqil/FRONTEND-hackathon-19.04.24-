import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, UrlSegment } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {
   }
  auth:boolean = false
  path!: String

  logout() {
    this.loadingService.showLoading()
    this.authService.logout()
    this.loadingService.hideLoading()
  }

  ngOnInit() {
    this.authService.authenticationState.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.auth = value
    })
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.path = this.router.url
    })
  }

}
