import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Action } from '../../../enums';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  public $currentAction = new BehaviorSubject<Action | undefined>(undefined);
  constructor() { }
}
