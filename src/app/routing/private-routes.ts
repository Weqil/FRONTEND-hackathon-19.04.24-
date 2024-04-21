import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CabinetComponent } from '../views/cabinet/cabinet.component';
import { WorkerProfileComponent } from '../views/worker-profile/worker-profile.component';
import { CheckAuthCanActiveGuard } from '../guards/check-auth.canactive.guard';
import { CompanyStatisticsComponent } from '../views/company-statistics/company-statistics.component';
import { WorkerStatisticsComponent } from '../views/worker-statistics/worker-statistics.component';


export const privateRoutes: Routes = [
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'worker-profile',
    component:WorkerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'worker-profile/:id',
    component:WorkerProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'statistics',
    component:CompanyStatisticsComponent,
    canActivate: [AuthGuard]
},
{
    path:'worker-statistics',
    component:WorkerStatisticsComponent,
    canActivate: [AuthGuard]
}
];