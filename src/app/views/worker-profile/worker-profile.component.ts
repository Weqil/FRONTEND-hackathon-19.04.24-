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

  customInputForm!:FormGroup
  userId: Number = 0

  getUser() {
    if (this.userId) {
      
    } else {

    }
  }

  addHobby(id: Number) {

  }

  delHobby(id: Number) {

  }

  addOffice(id: Number) {

  }

  delOffice(id: Number) {}
 
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId)
    });

    this.customInputForm = new FormGroup({
      name:new FormControl('',[ 
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      age:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.email, Validators.required]),
      offices:new FormControl([],[Validators.required]),
      hobbyes:new FormControl([],[Validators.required]),
    })
  }



}
