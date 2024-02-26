import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  public errorHandler(response: any): string {
    
    let msg = response.error.message;
    
    if(msg.includes('E11000')){

      msg = 'Запись уже существует';

    }
    
    this.snackBar.open(msg, 'ERROR');

    return response;
  }

  public errorMessage(message: string) {
    this.snackBar.open(message, 'ERROR');
    console.log(message);
  }
}
