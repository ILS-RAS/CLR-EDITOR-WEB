import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menuItem';
import { MenuService } from '../../services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppConfig } from '../../../constants/app-config';
import { MetaService } from '../project/services/meta.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

  constructor(private metaService: MetaService){
    this.metaService.GetTaxonomy();
  }

}
