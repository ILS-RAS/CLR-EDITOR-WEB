import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  public $indexPanelOpened = new BehaviorSubject<boolean>(false);
  public $entryPanelOpened = new BehaviorSubject<boolean>(false);
  public $progressBarIsOn = new BehaviorSubject<boolean>(false);
  constructor() { }

  Reset() {
    this.$indexPanelOpened.next(false);
    this.$entryPanelOpened.next(false);
  }
}
