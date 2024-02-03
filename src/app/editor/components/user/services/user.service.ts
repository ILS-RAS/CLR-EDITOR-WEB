import { Injectable } from '@angular/core';
import { UserModel } from '../../../models';
import { ApiService } from '../../../services/api.service';
import { AppType } from '../../../enums';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $users = new BehaviorSubject<UserModel[]>([]);

  constructor(private userApiService: ApiService<UserModel>) { }

  public async GetUsers(){
    let result = this.userApiService.findAll(new UserModel({}), AppType.User);
    this.$users.next(await lastValueFrom<UserModel[]>(result));
  }
}
