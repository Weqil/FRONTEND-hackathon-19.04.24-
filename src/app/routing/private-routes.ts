import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CabinetComponent } from '../views/cabinet/cabinet.component';
import { WorkerProfileComponent } from '../views/worker-profile/worker-profile.component';
import { CheckAuthCanActiveGuard } from '../guards/check-auth.canactive.guard';


export const privateRoutes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'worker-profile',
    component:WorkerProfileComponent,
    canActivate: [CheckAuthCanActiveGuard]
  },
  {
    path:'worker-profile/:id',
    component:WorkerProfileComponent,
    canActivate: [CheckAuthCanActiveGuard]
  },
];