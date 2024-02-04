import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent extends BaseModel implements OnInit {
CreateUser() {
throw new Error('Method not implemented.');
}
  constructor(private userService: UserService){
    super();
  }
  ngOnInit(): void {
    this.userService.GetUsers();
  }
}
