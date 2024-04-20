import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject, catchError, of } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private companyService: CompanyService,
    private meetingService: MeetingService
  ) { }
  companyWorker:string = 'worker'
  companyUsersCount: Number = 0
  companyMeetingsCount: Number = 0

  getUsersCompaniesCount() {
    this.companyService.getAllUsersCompanyCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.companyUsersCount = response.company_users_count
    })
  }

  getUsersMeetingCount() {
    this.meetingService.getAllUsersCompanyCount().pipe(
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.meetingService = response.company_meetings_count
    })
  }

  ngOnInit() {
  this.getUsersCompaniesCount()
  // this.getUsersMeetingCount()
  }
}
