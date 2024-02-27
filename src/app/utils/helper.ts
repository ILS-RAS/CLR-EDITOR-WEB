import { UserRole } from "../editor/enums";

export class Helper {
  public static CompareStrings(a: string, b: string) {
    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  }

  public static IsFormValid(status: string): boolean {
    return status == 'VALID' ? true : false;
  }

  public static ResolveRoleName(role:number){
    if(role == UserRole.Admitistrator){
      return "Admitistrator";
    }else{
      return "Editor";
    }
  }

  public static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
} 

