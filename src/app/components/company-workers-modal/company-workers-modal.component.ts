import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, of } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-company-workers-modal',
  templateUrl: './company-workers-modal.component.html',
  styleUrls: ['./company-workers-modal.component.scss'],
})
export class CompanyWorkersModalComponent  implements OnInit {

  constructor(
    private companyService: CompanyService,
    private loadingService: LoadingService
  ) { }

  companyUsersCount: any[] = []

  getUsersCompaniesCount() {
    this.loadingService.showLoading()
    this.companyService.getAllUsersCompany().pipe(
      catchError(err => {
        this.loadingService.hideLoading();
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyUsersCount = response.company_users
      console.log(response)
      this.loadingService.hideLoading();
    })
  }

  ngOnInit() {
    this.getUsersCompaniesCount()
  }

}
