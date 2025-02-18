import { UserRole } from "../editor/enums";
import { IndexModel } from "../editor/models";

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
    if(role == UserRole.Administrator){
      return "Administrator";
    }else{
      return "Editor";
    }
  }

  public static SortIndeces(a: IndexModel, b: IndexModel){
    if (a.name === b.name) {
      return 0;
    }
  
    let a_arr = a.name!.split('.');
    let b_arr = b.name!.split('.');
    
    let len = Math.min(a_arr.length, b_arr.length);
  
    for (let i = 0; i < len; i++) {
      if (Number(a_arr[i]) > Number(b_arr[i])) {
        return 1;
      } else if (Number(a_arr[i]) < Number(b_arr[i])) {
        return - 1
      }
    }
  
    if (a_arr.length < b_arr.length) {
      return -1;
    }
  
    if (b_arr.length < a_arr.length) {
      return 1;
    }
  
    return 0;
  }

  public static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:no-bitwise
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
} 

