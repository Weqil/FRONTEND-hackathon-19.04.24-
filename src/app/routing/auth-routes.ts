import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from '../views/login/login.component';
import { LoggedInAuthGuard } from '../guards/logged-in-auth.guard';
import { RegisterComponent } from '../views/register/register.component';

// import { RegistrationComponent } from '../views/registration/registration.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInAuthGuard],
  },
//   {
//     path: 'login/:user_id',
//     component: LoginComponent,
//     canActivate: [LoggedInAuthGuard],
//   },
//   {
//     path: 'registration',
//     component: RegistrationComponent,
//     canActivate: [LoggedInAuthGuard],
//   },
];