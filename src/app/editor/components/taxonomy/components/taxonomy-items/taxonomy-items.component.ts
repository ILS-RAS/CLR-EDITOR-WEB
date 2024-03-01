import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { TaxonomyViewModel } from '../../../../models';
import { MetaService } from '../../../project/services/meta.service';
import { takeUntil } from 'rxjs';
import { TaxonomyCategory } from '../../../../enums';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-taxonomy-items',
  templateUrl: './taxonomy-items.component.html',
  styleUrl: './taxonomy-items.component.scss'
})
export class TaxonomyItemsComponent extends BaseComponent implements OnInit {
  index?: TaxonomyViewModel;
  displayedColumns: string[] = ['code', 'desc'];
  dataSource: MatTableDataSource<TaxonomyViewModel> = new MatTableDataSource();
  constructor(private metaService: MetaService) {
    super();
  }
  ngOnInit(): void {
    this.metaService.$currentCategory.pipe(takeUntil(this.destroyed)).subscribe(item=>{
      this.index = item;
      let list = this.metaService.GetByCategory(item?.categoryCode as TaxonomyCategory).sort((a, b) => a.code!.localeCompare(b.code!));
      this.dataSource = new MatTableDataSource(list);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
