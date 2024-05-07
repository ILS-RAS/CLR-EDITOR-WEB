import { Component, OnInit } from '@angular/core';
import { TaxonomyViewModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { MetaService } from '../../../project/services/meta.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

createTaxonomy(): void {
  throw new Error('Method not implemented.')
}
}
