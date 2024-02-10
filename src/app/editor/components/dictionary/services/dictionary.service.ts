import { Injectable } from '@angular/core';
import { ProjectModel } from '../../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  public $currentDictionary = new BehaviorSubject<ProjectModel | undefined>(
    undefined
  );

  public InitContext(project: ProjectModel | undefined) {
    this.$currentDictionary.next(project);
  }
}
