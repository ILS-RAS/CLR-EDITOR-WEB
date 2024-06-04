import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public layoutService: LayoutService) {

   }
}
