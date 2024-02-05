import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../../../models';
import { takeUntil } from 'rxjs';
import { UserRole } from '../../../../enums';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent extends BaseComponent {
  panelOpenState = false;
  @Input() user?: UserModel;
  constructor(private userService: UserService){
    super();
  }

}
