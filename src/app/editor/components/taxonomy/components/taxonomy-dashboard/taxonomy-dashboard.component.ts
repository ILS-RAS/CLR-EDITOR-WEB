import { Component } from '@angular/core';
import { TaxonomyViewModel } from '../../../../models';

@Component({
  selector: 'app-taxonomy-dashboard',
  templateUrl: './taxonomy-dashboard.component.html',
  styleUrl: './taxonomy-dashboard.component.scss'
})
export class TaxonomyDashboardComponent {
index?:TaxonomyViewModel;
CreateTaxonomy() {
throw new Error('Method not implemented.');
}

indexSelected(index: TaxonomyViewModel) {
  this.index = index;
}

}
