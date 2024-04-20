import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    private userServices: UserService
  ) { 
    this.getCompanyId()
    this.getUserId()
  }

  company_id: Number = 0
  user_id: Number = 0

  getCompanyId() {
    const user = this.userServices.getUserFromLocalStorage()
    if (user) {
      this.company_id = user.companies[0].id
    } else {
      this.getCompanyId()
    }
    
  }

  getUserId() {
    const user = this.userServices.getUserFromLocalStorage()
    if (user) {
      this.user_id = user.id
    } else {
      this.getUserId()
    }
    
  }

  getAllUsersCompanyCount() {
    return this.http.get<any>(
      `${environment.BACK_URL}:${environment.BACK_PORT}/api/companies/${this.company_id}/users/count`
    );
  }
}
