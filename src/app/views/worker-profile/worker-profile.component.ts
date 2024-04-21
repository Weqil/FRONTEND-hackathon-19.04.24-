import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    private userService: UserService
  ) { }

  profileForm!:FormGroup
  userId: Number = 0
  hobbies:any = []
  getUser() {
    if (this.userId) {
      
    } else {
      this.userService.getUserHobbyes().pipe().subscribe((res)=>{
        this.hobbies = res.hobbyes
    })
    }
  }

  addOffice(id: Number) {
    
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
      console.log(res)
    })
    this.getUser()
  }

  delOffice(id: Number) {}
 
  ngOnInit() {
    this.getUser()
    
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId)
    });

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
