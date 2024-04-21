import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { EMPTY, Subject, catchError, map, of, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-worker-statistics',
  templateUrl: './worker-statistics.component.html',
  styleUrls: ['./worker-statistics.component.scss'],
})
export class WorkerStatisticsComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private meetingService: MeetingService,
    private userService: UserService,
    private toastService: ToastService,
    private loadiingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  meetingsCount: Number = 0
  meetings: any[] = []
  meetingNow: any = new Date("01.01.1970")
  
  
  getUsersMeetingCount() {
    this.meetingService.getAllUsersMeetingsCount().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        return of(EMPTY)
      })
    ).subscribe((response: any) => {
      this.meetingsCount = response.users_meetings_count
    })
  }

  getMeetings(){
    this.loadiingService.showLoading()
    this.meetingService.getAllUsersMeetings()
    .pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loadiingService.hideLoading()
        this.toastService.showToast('Не удалось загрузить встречи', 'warning')
        return of(EMPTY)
      })
    )
    .subscribe((response: any) => {
      this.meetings = response.users_meetings
      this.getMeetingNow()
      this.loadiingService.hideLoading()
    })
  }

  getMeetingNow() {
    this.meetingNow = new Date("01.01.1970")
    this.meetings.forEach((meeting:any, key) => {
      if (new Date(meeting.start_time).getTime() > new Date(this.meetingNow).getTime()) {
        this.meetingNow = meeting
      }
    })
  }

  acceptMeeting(id: Number) {
    this.loadiingService.showLoading()
    this.meetingService.acceptMeetingUser(id).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.meetingNow.status = true
        this.loadiingService.hideLoading()
        this.toastService.showToast('Не удалось принять встречу', 'warning')
        return of(EMPTY)
      })
    )
    .subscribe(() => {
      this.loadiingService.hideLoading()
      // this.cdr.detectChanges()
      this.router.navigateByUrl('/worker-statistics');
      this.getMeetings()
    })
  }

  rejectMeeting(id: Number) {
    this.loadiingService.showLoading()
    this.meetingService.rejectMeetingUser(id).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loadiingService.hideLoading()
        this.toastService.showToast('Не удалось отклонить встречу', 'warning')
        return of(EMPTY)
      })
    )
    .subscribe(() => {
      this.loadiingService.hideLoading()
      this.meetingNow.status = false
      // this.cdr.detectChanges()
      this.router.navigateByUrl('/worker-statistics')
      this.getMeetings()
    })
  }

  ngOnInit() {
    this.getUsersMeetingCount()
    this.getMeetings()
  }

}
