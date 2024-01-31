import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { MenuService } from '../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppConfig } from '../../../constants/app-config';
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
