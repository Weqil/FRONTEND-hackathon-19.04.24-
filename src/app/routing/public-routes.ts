import { Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { CheckAuthCanActiveGuard } from '../guards/check-auth.canactive.guard';
import { CompanyStatisticsComponent } from '../views/company-statistics/company-statistics.component';


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
    }
//   {
//     path: 'home',
//     component: HomeComponent,
//     v,
//   }
];
