import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BaseModel } from '../../../../models/baseModel';
import { UserModel } from '../../../../models';
import { UserRole } from '../../../../enums';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
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
    
  }

  ResolveRoleName(role:number){
    return role as UserRole;
  }
}
