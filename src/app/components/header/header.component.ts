import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router, UrlSegment } from '@angular/router';

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
    private router: Router
  ) {
   }
  auth:boolean = false
  path!: String

  ngOnInit() {
    this.authService.authenticationState.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.auth = value
    })
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.path = this.router.url
      console.log(this.path)
    })
  }

}
