import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { Helper } from '../../../../../utils';
import { AppType, EditionType, Language, TaxonomyCategory } from '../../../../enums';
import { HeaderModel, IndexModel, TaxonomyViewModel } from '../../../../models';
import { MetaService } from '../../services/meta.service';
import { ProjectService } from '../../services/project.service';
import { takeUntil, lastValueFrom } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HeaderQuery, IndexQuery } from '../../../../queries';

@Component({
  selector: 'app-text-header-editor',
  templateUrl: './text-header-editor.component.html',
  styleUrl: './text-header-editor.component.scss',
})
export class TextHeaderEditorComponent extends BaseComponent implements OnInit {
  creatingNew?: boolean;
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  languages?: TaxonomyViewModel[];
  editionTypes?: TaxonomyViewModel[];
  title?: string;
  header?: HeaderModel;
  origHeader?: HeaderModel;
  ableToClone?: boolean;
  cloneOrig: boolean = false;

  constructor(
    private metaService: MetaService,
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder,
    private refconf: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private headerApiService: ApiService<HeaderModel>,
    private indexApiService: ApiService<IndexModel>
  ) {
    super();
    this.form = this.formBuilder.group({
      codeInput: new UntypedFormControl(''),
      langSelect: new UntypedFormControl(''),
      cloneOrig: new UntypedFormControl(''),
      biblioInput: new UntypedFormControl(''),
      editionTypeSelect: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.header = this.refconf.data;
    this.creatingNew = this.header?.status ? false : true;

    if (this.creatingNew) {
      lastValueFrom(this.headerApiService.findByQuery(
        new HeaderModel({}),
        JSON.stringify(new HeaderQuery({projectId: this.projectService.$currentHeader.value?.projectId, editionType: 'orig'})),
        AppType.Header
      )).then((header) => {
        this.origHeader = header[0];
        this.ableToClone = this.origHeader? true : false;
      })
    } else  {
      this.ableToClone = false;
    }

    this.metaService.GetTaxonomy().then(() => {
      this.languages = this.metaService.GetByCategory(TaxonomyCategory.Lang);
      this.editionTypes = this.metaService.GetByCategory(TaxonomyCategory.EditionType);
    });

    if (this.header) {
      this.form.controls['codeInput'].setValue(this.header.code);
        this.form.controls['editionTypeSelect'].setValue(
          this.header.editionType
        );
        this.form.controls['langSelect'].setValue(this.header.lang);
        this.form.controls['biblioInput'].setValue(this.header.desc);
    }

    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Change() {
    this.cloneOrig = !this.cloneOrig;
  }

Save() {
    this.header!.projectId = this.projectService.$currentProject.value?._id;
    this.header!.code = this.form.controls['codeInput'].value;
    this.header!.editionType = this.form.controls['editionTypeSelect'].value;
    this.header!.lang = this.form.controls['langSelect'].value;
    this.header!.desc = this.form.controls['biblioInput'].value;
    if (this.header!.status) {
      this.header!.status = 'edited'
    } 
    
    this.projectService.SaveHeader(this.header!).then(async (item) => {
      let savedHeader = item as HeaderModel;
      if (savedHeader && savedHeader.projectId) {
        if (this.creatingNew) {
          if (this.cloneOrig) {
            let savedIndeces: IndexModel[] = []
            let origIndeces = await lastValueFrom(this.indexApiService.findByQuery(
              new IndexModel({}),
              JSON.stringify(new IndexQuery({headerId: this.origHeader?._id})),
              AppType.Index
            ));
            origIndeces.sort(Helper.SortIndeces);
            for (let origIndex of origIndeces) {
              let newIndex = new IndexModel({
                order: origIndex.order,
                name: origIndex.name,
                headerId: savedHeader._id
              })
                  
              if (origIndex.parentId) {                  
                let arrIndex = origIndeces.findIndex((element: any) => element._id == origIndex.parentId)
                let newParent = savedIndeces[arrIndex];
                newIndex.parentId = newParent._id;
              } 
              await this.projectService.SaveIndex(newIndex).then((index) => {
                savedIndeces.push(index);
              })
            }
          } else {
            let newIndex = new IndexModel({
              headerId: savedHeader._id,
              name: '1',
              order: 1
            });
            this.projectService.SaveIndex(newIndex);
          }
        }
        this.projectService
          .GetHeadersByProjectId(savedHeader.projectId)
          .then(() => {
            if (!this.creatingNew) {
              this.projectService.$currentHeader.next(savedHeader);
            }
            this.ref.close(savedHeader);
          });
      }
    });
  }
}
