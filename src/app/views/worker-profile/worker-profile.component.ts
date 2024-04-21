import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Subject, catchError, of, takeUntil } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss'],
})
export class WorkerProfileComponent  implements OnInit {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toasrService: ToastService
  ) { }

  profileForm!:FormGroup
  userId: Number = 0
  hobbies:any = []
  offices: any = []
  user: any


  getUser() {
    console.log(this.userId)
    if (this.userId) {
      this.userService.getUserForIds(this.userId).pipe(
        takeUntil(this.destroy$),
        catchError(err => {
          this.toasrService.showToast('Не удалось загрузить пользователя', 'warning')
          return of(EMPTY)
        })
      ).subscribe((response: any) => {
        this.user = response
        this.hobbies = response.hobbies
        this.offices = response.offices
      })
    } else {
      this.user = this.userService.getUserFromLocalStorage()
      this.getHobby()
      this.getOffice()
    }
  }

  getHobby() {
    this.userService.getUserHobbyes().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.toasrService.showToast('Не удалось загрузить хобби', 'warning')
        return of(EMPTY)
      })
    ).subscribe((res)=>{
      this.hobbies = res.hobbyes
    })
  }

  getOffice() {
    this.userService.getUserOffices().pipe(
      takeUntil(this.destroy$),
      catchError(err => {
        this.toasrService.showToast('Не удалось загрузить хобби', 'warning')
        return of(EMPTY)
      })
    ).subscribe((res)=>{
      this.offices = res.offices
    })
  }

  addOffice(name: any) {
    this.userService.addUserHobbyes(name.target.id).pipe().subscribe((res)=>{
      console.log(res)
    })
    this.getUser()
  }

  delHobby(id:any) {
    this.userService.delUserHobbyes(id.target.id).pipe().subscribe((res)=>{
      console.log(res)
    })
    this.getUser()
  }

  addHobby(name:any) {
    let hobbyName:any = {
      "name":name.target.id
    }
    this.hobbies.push(name.target.id)
    this.userService.createUserHobbyes(hobbyName).pipe().subscribe((res)=>{
      this.getUser()
    })
  }

  delOffice(id: any) {
    this.userService.delUserOffices(id.target.id).pipe().subscribe((res)=>{
      console.log(res)
      this.getUser()
    })
  }
 
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.userId = params['id'];
    });
    this.getUser()

    this.profileForm = new FormGroup({
      name:new FormControl('',[ 
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      age:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.email, Validators.required]),
      offices:new FormControl([],[Validators.required]),
      hobbyes:new FormControl([],[Validators.required]),
      hobbyesText:new FormControl('',[Validators.required])
    })
  }



}
