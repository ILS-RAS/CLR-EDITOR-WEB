import { Component, OnInit, ViewEncapsulation, input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { UserModel } from '../../../../models';
import { UserRole } from '../../../../enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  encapsulation:ViewEncapsulation.Emulated
})
export class UserListComponent extends BaseModel implements OnInit {
  users?: UserModel[];
  constructor(
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.$users.subscribe((users) => {
      this.users = users.sort((a, b) => a.name!.localeCompare(b.name!));
    });
  }

  Select(user: UserModel) {
    this.userService.$user.next(user);
  }

  ResolveRoleName(role:number){
    if(role == UserRole.Admitistrator){
      return "Admitistrator";
    }else{
      return "Editor";
    }
  }

}
