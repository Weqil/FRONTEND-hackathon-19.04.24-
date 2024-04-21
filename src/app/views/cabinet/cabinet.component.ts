import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subject, catchError, of, takeUntil } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private toastService: ToastService,
    private companyService: CompanyService,
    private meetingService: MeetingService,
    private userService: UserService,
    private loaderService: LoadingService,
    private router: Router
  ) { }
  companyWorker:string = ''
  companyUsersCount: Number = 0
  companyMeetingsCount: Number = 0
  usersMeetingsCount: Number = 0

  codes: any[] = []

  getCompaniesCompaniesCount() {
    this.companyService.getAllUsersCompanyCount().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyUsersCount = response.company_users_count
    })
  }

  getCompaniesMeetingCount() {
    this.meetingService.getAllUsersCompanyCount().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyMeetingsCount = response.company_meentings_count
    })
  }

  getUsersMeetingCount() {
    this.meetingService.getAllUsersMeetingsCount().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.usersMeetingsCount = response.users_meetings_count
    })
  }
  getCodeCompany() {
    this.loaderService.showLoading()
    this.companyService.getCode().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loaderService.hideLoading()
        this.toastService.showToast('Не удалось загрузить коды', "warning")
        return of(EMPTY)
      })
    ).subscribe(response => {
      this.loaderService.hideLoading()
        this.codes = response.company_invites
    })
  }

  addCodeCompany() {
    this.loaderService.showLoading()
    this.companyService.addCode().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loaderService.hideLoading()
        this.toastService.showToast('Не удалось добавить код', "warning")
        return of(EMPTY)
      })
    ).subscribe(() => {
      this.loaderService.hideLoading()
      this.getCodeCompany()
    })
  }

  deleteCodeCompany(id: Number) {
    this.loaderService.showLoading()
    this.companyService.deleteCode(id).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loaderService.hideLoading()
        this.toastService.showToast('Не удалось удалить код', "warning")
        return of(EMPTY)
      })
    ).subscribe(() => {
      this.loaderService.hideLoading()
      this.getCodeCompany()
    })
  }

  ngOnInit() {
    const user = this.userService.getUserFromLocalStorage()
    if (user.companies.user_id == user.id) {
      this.companyWorker = 'company'
      this.getCompaniesCompaniesCount()
      this.getCompaniesMeetingCount()
      this.getCodeCompany()
    } else {
      this.companyWorker = 'worker'
      this.getUsersMeetingCount()
    }
  }
}
