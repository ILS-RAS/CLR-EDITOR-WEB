import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  visible = false;
  
  constructor() { }

  sidebarToggle() {
    this.visible = !this.visible;
  }
}
