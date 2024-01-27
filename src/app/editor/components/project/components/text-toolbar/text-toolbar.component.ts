import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { IndexModel } from '../../../../models';

@Component({
  selector: 'app-text-toolbar',
  templateUrl: './text-toolbar.component.html',
  styleUrl: './text-toolbar.component.scss'
})
export class TextToolbarComponent implements OnInit {
  
  @Output() onToggleIndex: EventEmitter<void> = new EventEmitter();
  toggleIcon: string = "left_panel_open";
  index?:IndexModel;
  constructor(private projectService: ProjectService) {
    this.projectService.$currentIndex.subscribe(item=>{
      this.index = item;
    })
  }
  Click() {
    this.onToggleIndex.emit();
    this.toggleIcon = this.toggleIcon == "left_panel_open" ? "left_panel_close" : "left_panel_open";
  }

  ngOnInit(): void {

  }
}
