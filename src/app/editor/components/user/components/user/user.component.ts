import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../../../models';
import { ProjectType } from '../../../../enums/projectType';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent extends BaseComponent {
  panelOpenState = false;
  @Input() user?: UserModel;
  text = ProjectType.Text;
  dict = ProjectType.Dictionary;
  constructor(private userService: UserService){
    super();
  }

}
