import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { EMPTY, Subject, catchError, of } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-company-settings-modal',
  templateUrl: './company-settings-modal.component.html',
  styleUrls: ['./company-settings-modal.component.scss'],
})
export class CompanySettingsModalComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private loaderService: LoadingService,
    private toastService: ToastService
  ) { }

  companyForm!: FormGroup
  old_meeting_week_day: String = ''
  old_name: String = ''

  getOldWeek() {
    const user = this.userService.getUserFromLocalStorage()
    this.old_meeting_week_day = user.companies[0].meeting_week_day
    this.old_name = user.companies[0].name
  }

  newCompanyLaod() {
      this.userService
        .getUserById()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.positiveResponseAfterLogin(data);
          },
          error: () => {
            this.loaderService.hideLoading();
          },
        });
    }

  positiveResponseAfterLogin(data: any) {
    this.userService.setUser(data.user);
    this.loaderService.hideLoading();
  }

  onSubmit() {
    this.loaderService.showLoading()
    this.companyService.editCompany(this.companyForm.value).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.loaderService.hideLoading()
        this.toastService.showToast('Изменения не вступили в силу', 'warning')
        return of(EMPTY)
      })
    ).subscribe(() => {
      this.loaderService.hideLoading()
      this.toastService.showToast('Изменения вступили в силу', 'success')
      this.newCompanyLaod()
    })
  }

  changeSelect(event:any) {
    this.companyForm.patchValue({meeting_week_day: event.target.value})
  }

  ngOnInit() {
    this.getOldWeek()
    this.companyForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      meeting_week_day: new FormControl('', [
        Validators.required,
      ]),
    });
    this.companyForm.patchValue({meeting_week_day: this.old_meeting_week_day})
    this.companyForm.patchValue({name: this.old_name})
  }

}
