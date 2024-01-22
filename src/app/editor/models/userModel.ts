import { BaseModel } from "./baseModel";

export class UserModel extends BaseModel {
    email: string | undefined;
    password: string | undefined;
}