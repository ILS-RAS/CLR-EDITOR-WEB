import { Component } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';


@Component({
  selector: 'app-element-toolbar',
  templateUrl: './element-toolbar.component.html',
  styleUrl: './element-toolbar.component.scss'
})
export class ElementToolbarComponent extends BaseComponent  {
  addModalVisible: boolean = false;

  openAddModal() {
    this.addModalVisible = true;
  }

}
