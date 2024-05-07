import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService {
  public $contentVisible = new BehaviorSubject<boolean>(true);
  constructor() { }
}
