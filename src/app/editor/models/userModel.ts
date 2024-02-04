import { UserRole } from "../enums";
import { BaseModel } from "./baseModel";

export class UserModel extends BaseModel {
    email?: string;
    password?: string;
    name?:string;
    role: number = UserRole.Editor;
    public constructor(fields: Partial<UserModel>) {
        super();
        Object.assign(this, fields);
     }
}