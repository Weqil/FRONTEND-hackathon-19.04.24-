import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject, catchError, of } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private companyService: CompanyService,
    private meetingService: MeetingService,
    private userService: UserService
  ) { }
  companyWorker:string = ''
  companyUsersCount: Number = 0
  companyMeetingsCount: Number = 0
  usersMeetingsCount: Number = 0

  getCompaniesCompaniesCount() {
    this.companyService.getAllUsersCompanyCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyUsersCount = response.company_users_count
    })
  }

  getCompaniesMeetingCount() {
    this.meetingService.getAllUsersCompanyCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyMeetingsCount = response.company_meentings_count
    })
  }

  getUsersMeetingCount() {
    this.meetingService.getAllUsersMeetingsCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.usersMeetingsCount = response.users_meetings_count
    })
  }

  ngOnInit() {
    const user = this.userService.getUserFromLocalStorage()
    if (user.companies.length > 0) {
      this.companyWorker = 'company'
      this.getCompaniesCompaniesCount()
      this.getCompaniesMeetingCount()
    } else {
      this.companyWorker = 'worker'
      this.getUsersMeetingCount()
    }
  }
}
