import { Injectable } from '@angular/core';
import { UserModel } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { AppType } from '../../../enums';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $users = new BehaviorSubject<UserModel[]>([]);
  public $user = new BehaviorSubject<UserModel | undefined>(undefined);

  constructor(private userApiService: ApiService<UserModel>, private authService: AuthService) { }

  public async GetUsers(){
    let result = this.userApiService.findAll(new UserModel({}), AppType.User);
    this.$users.next(await lastValueFrom<UserModel[]>(result));
  }

  public async Signup(user: UserModel){
      let result = this.authService.Signup(user);
      return await lastValueFrom(result);
  }
}
