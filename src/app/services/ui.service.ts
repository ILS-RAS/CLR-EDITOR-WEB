import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public $indexPanelOpened = new BehaviorSubject<boolean>(false);
  
  constructor() { }
}
