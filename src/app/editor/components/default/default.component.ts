import { Component } from '@angular/core';
import { MetaService } from '../taxonomy/services/meta.service';
import { BaseComponent } from '../../../components/base/base/base.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent extends BaseComponent {

  constructor(){
    super();
  }

}
