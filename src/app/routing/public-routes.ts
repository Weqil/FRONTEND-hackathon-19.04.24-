import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { CheckAuthCanActiveGuard } from '../guards/check-auth.canactive.guard';
import { CompanyStatisticsComponent } from '../views/company-statistics/company-statistics.component';
import { CabinetComponent } from '../views/cabinet/cabinet.component';
import { WorkerStatisticsComponent } from '../views/worker-statistics/worker-statistics.component';
import { WorkerProfileComponent } from '../views/worker-profile/worker-profile.component';
export const publicRoutes: Routes = [
    {
        path:'home', 
        component:HomeComponent,
        canActivate: [CheckAuthCanActiveGuard]
    },
    {
        path:'', 
        component:HomeComponent,
        canActivate: [CheckAuthCanActiveGuard]
    },
    // {
    //     path:'cabinet',
    //     component:CabinetComponent,
    //     canActivate: [CheckAuthCanActiveGuard]
    // },
    {
        path:'statistics',
        component:CompanyStatisticsComponent,
        canActivate: [CheckAuthCanActiveGuard]
    },
    {
        path:'worker-statistics',
        component:WorkerStatisticsComponent,
        canActivate: [CheckAuthCanActiveGuard]
    },
    {
        path:'worker-profile',
        component:WorkerProfileComponent,
        canActivate: [CheckAuthCanActiveGuard]
    },

//   {
//     path: 'home',
//     component: HomeComponent,
//     v,
//   }
];
