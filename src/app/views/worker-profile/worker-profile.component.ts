import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss'],
})
export class WorkerProfileComponent  implements OnInit {

  constructor() { }
  customInputFormProfession!:FormGroup
  professionAdd:any = []
  professionCurrent:any = []
  professionDelete:any = []
  customInputFormProfessionClick(){
  if(this.customInputFormProfession.value.text !==""){
    this.professionAdd.push(this.customInputFormProfession.value.text)
    this.customInputFormProfession.patchValue({
     text:""
    }) 
  }
   console.log(this.professionAdd)
  }

  customInputFormProfessionDel(event:any){
    console.log(event.target.name)
  }

  ngOnInit() {
    this.customInputFormProfession = new FormGroup({
      text:new FormControl('',[Validators.required])
    })
  }



}
