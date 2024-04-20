import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, of } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-company-statistics',
  templateUrl: './company-statistics.component.html',
  styleUrls: ['./company-statistics.component.scss'],
})
export class CompanyStatisticsComponent  implements OnInit {

  constructor(
    private meetingService: MeetingService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { }

  meetings: any[] = []

  getUsersMeetingCount() {
    this.loadingService.showLoading()
    this.meetingService.getAllUsersCompany().pipe(
      catchError(err => {
        this.toastService.showToast('при загрузке встреч произошла ошибка', 'warning')
        this.loadingService.hideLoading()
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      console.log(response)
      this.loadingService.hideLoading()
      this.meetings = response.company_meetings
    })
  }

  getMeetings(){
    this.meetingService.getAllCompanyMeetings()
    .subscribe((response: any) => {
      this.meetings = response.company_meetings
    })
  }

  ngOnInit() {
    this.getUsersMeetingCount()
    this.getMeetings()
  }

}
