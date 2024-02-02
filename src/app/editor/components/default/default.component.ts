import { Component } from '@angular/core';
import { MetaService } from '../project/services/meta.service';
import { BaseComponent } from '../../../components/base/base/base.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent extends BaseComponent {

  constructor(private metaService: MetaService){
    super();
    this.metaService.GetTaxonomy();
  }

}
