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

} 

