import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject, catchError, of } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private companyService: CompanyService
  ) { }
  companyWorker:string = 'company'
  companyUsersCount: Number = 0

  getUsersCompaniesCount() {
    this.companyService.getAllUsersCompanyCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyUsersCount = response.company_users_count
    })
  }

  ngOnInit() {
  this.getUsersCompaniesCount()
  }
}
