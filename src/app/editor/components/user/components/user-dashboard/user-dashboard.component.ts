import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { UserModel } from '../../../../models';
import { ProjectService } from '../../../project/services/project.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../../../components/base/base/base.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent extends BaseComponent implements OnInit {
user?:UserModel;
CreateUser() {
throw new Error('Method not implemented.');
}
  constructor(private userService: UserService, private projecrService: ProjectService){
    super();
  }
  ngOnInit(): void {
    this.userService.GetUsers();
    this.userService.$user.pipe(takeUntil(this.destroyed)).subscribe(user=>{
      this.user = user;
    })
  }
}
