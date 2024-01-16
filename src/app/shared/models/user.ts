import { AppType } from '@shared/constants';
import { Model } from './base/model';


export class User extends Model {
    apiType = AppType.User;
    email: string;
    password: string;
    token: string;
    public constructor(fields: Partial<User>) {
        super();
        Object.assign(this, fields);
     }
}