import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { Helper } from '../../../../../utils';
import { EditionType, Language, TaxonomyCategory } from '../../../../enums';
import { HeaderModel, TaxonomyViewModel } from '../../../../models';
import { MetaService } from '../../services/meta.service';
import { ProjectService } from '../../services/project.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-header-editor',
  templateUrl: './text-header-editor.component.html',
  styleUrl: './text-header-editor.component.scss',
})
export class TextHeaderEditorComponent extends BaseComponent implements OnInit {
  isDisabled: boolean = true;
  form: UntypedFormGroup;
  languages?: TaxonomyViewModel[];
  editionTypes?: TaxonomyViewModel[];
  title?: string;
  header?: HeaderModel;
  constructor(
    private metaService: MetaService,
    private projectService: ProjectService,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
    this.form = this.formBuilder.group({
      codeInput: new UntypedFormControl(''),
      langSelect: new UntypedFormControl(''),
      biblioInput: new UntypedFormControl(''),
      editionTypeSelect: new UntypedFormControl(''),
    });
  }

  ngOnInit(): void {
    this.projectService.$currentHeader
      .pipe(takeUntil(this.destroyed))
      .subscribe((header) => {
        this.header = header;
      });
    if (!this.header) {
      if (
        !this.projectService.$projectHeaders.value ||
        this.projectService.$projectHeaders.value.length == 0
      ) {
        this.editionTypes = this.metaService
          .GetByCategory(TaxonomyCategory.EditionType)
          .filter((i) => i.code == EditionType.Original);
        this.languages = this.metaService
          .GetByCategory(TaxonomyCategory.Lang)
          .filter((i) => i.code == Language.lat);

        this.form.controls['editionTypeSelect'].setValue(EditionType.Original);
        this.form.controls['langSelect'].setValue(Language.lat);
        this.title = 'Editio originalis';
      }
      if (
        this.projectService.$projectHeaders.value &&
        this.projectService.$projectHeaders.value.length >= 1
      ) {
        this.editionTypes = this.metaService
          .GetByCategory(TaxonomyCategory.EditionType)
          .filter((i) => i.code == EditionType.Interpretation);
        this.languages = this.metaService
          .GetByCategory(TaxonomyCategory.Lang)
          .filter((i) => i.code == Language.rus);
        this.form.controls['editionTypeSelect'].setValue(
          EditionType.Interpretation
        );
        this.form.controls['langSelect'].setValue(Language.rus);
        this.title = 'Interpretatio';
      }
    } else {
      if (this.header) {
        this.editionTypes = this.metaService
          .GetByCategory(TaxonomyCategory.EditionType)
          .filter((i) => i.code == this.header?.editionType);
        this.languages = this.metaService
          .GetByCategory(TaxonomyCategory.Lang)
          .filter((i) => i.code == this.header?.lang);

        if (this.header.editionType == EditionType.Original) {
          this.title = 'Editio originalis';
        } else {
          this.title = 'Interpretatio';
        }

        this.form.controls['codeInput'].setValue(this.header.code);
        this.form.controls['editionTypeSelect'].setValue(
          this.header.editionType
        );
        this.form.controls['langSelect'].setValue(this.header.lang);
        this.form.controls['biblioInput'].setValue(this.header.desc);
      }
    }

    this.form.statusChanges.subscribe(
      (val) => (this.isDisabled = !Helper.IsFormValid(val))
    );
  }

  Save() {
    if (this.header) {
      this.header.projectId = this.projectService.$currentProject.value?._id;
      this.header.code = this.form.controls['codeInput'].value;
      this.header.editionType = this.form.controls['editionTypeSelect'].value;
      this.header.lang = this.form.controls['langSelect'].value;
      this.header.desc = this.form.controls['biblioInput'].value;
  
      this.projectService.SaveHeader(this.header).then((item) => {
        let savedHeader = item as HeaderModel;
        if (savedHeader && savedHeader.projectId) {
          this.projectService
            .GetHeadersByProjectId(savedHeader.projectId)
            .then(() => {});
        }
      });
    }
  }
  Cancel() {}
}
