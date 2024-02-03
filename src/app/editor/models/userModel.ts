import { BaseModel } from "./baseModel";

export class UserModel extends BaseModel {
    email?: string;
    password?: string;
    public constructor(fields: Partial<UserModel>) {
        super();
        Object.assign(this, fields);
     }
}