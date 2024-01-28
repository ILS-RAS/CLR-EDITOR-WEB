import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IndexModel } from '../../../../models';
import { ActionService } from '../../services/action.service';
import { Action } from '../../../../enums';

@Component({
  selector: 'app-text-toolbar',
  templateUrl: './text-toolbar.component.html',
  styleUrl: './text-toolbar.component.scss',
})
export class TextToolbarComponent implements OnInit {

  @Output() onToggleIndex: EventEmitter<void> = new EventEmitter();
  toggleIcon: string = 'left_panel_open';
  toggleLabel: string = 'Interpretatio';
  index?: IndexModel;
  isChecked = false;
  isToggled = false;
  constructor(private projectService: ProjectService, private actionService: ActionService) {
    this.projectService.$currentIndex.subscribe((item) => {
      this.index = item;
    });
  }

  Click() {
    this.onToggleIndex.emit();
    this.isToggled = !this.isToggled;
    this.toggleIcon =
      this.toggleIcon == 'left_panel_open'
        ? 'left_panel_close'
        : 'left_panel_open';
  }

  ngOnInit(): void {
    this.projectService.$showVersion.subscribe((item) => {
      this.isChecked = item;
    });
  }

  DeleteChunk() {
    throw new Error('Method not implemented.');
  }

  EditChunk() {
    this.actionService.$currentAction.next(Action.EditChunk);
  }

  SaveChunk() {
    this.actionService.$currentAction.next(Action.SaveChunk);
  }

  Change() {
    this.projectService.$showVersion.next(this.isChecked);
    if (this.isChecked == false) {
      this.projectService.$currentInterpChunks.next(undefined);
    } else {
      if (this.projectService.$currentChunk.value) {
        this.projectService.GetInterp(
          this.projectService.$currentChunk.value._id as string,
          this.projectService.$currentChunk.value.headerLang == 'lat'
        );
      }
    }
  }
}
