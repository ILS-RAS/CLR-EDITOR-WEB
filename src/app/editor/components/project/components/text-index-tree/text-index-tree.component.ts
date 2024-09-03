import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ConfirmationService, MenuItem, TreeNode } from 'primeng/api';
import { ChunkViewModel, HeaderModel, IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ProjectService } from '../../services/project.service';
import { takeUntil } from 'rxjs';
import { TextIndexBuilderComponent } from '../text-index-builder/text-index-builder.component';
import { TextIndexItemEditorComponent } from '../text-index-item-editor/text-index-item-editor.component';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-text-index-tree',
  templateUrl: './text-index-tree.component.html',
  styleUrl: './text-index-tree.component.scss',
  providers: [ConfirmationService]
})
export class TextIndexTreeComponent extends BaseComponent {
  @Input() header?: HeaderModel;

  public indeces: IndexModel[] = [];

  loading: boolean = false;

  nodes!: TreeNode[];

  items!: MenuItem[];

  ref: DynamicDialogRef | undefined;

  selection: IndexModel | undefined;

  constructor(
    private cd: ChangeDetectorRef,
    private projectService: ProjectService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
  ) {
    super();
  }

  ngOnInit() {
    this.loading = true;
    this.projectService.$currentIndeces
      .pipe(takeUntil(this.destroyed))
      .subscribe((indeces) => {
        if (indeces) {
          this.nodes = indeces
            .filter((i) => !i.parentId)
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((index) => this.createNode(index));
          this.loading = false;
          this.cd.markForCheck();
        }
      });

    this.projectService.$currentIndex
      .pipe(takeUntil(this.destroyed))
      .subscribe((index) => {
        if (index) {
          this.selection = index;
        }
      })

    this.items = [
      {
        label: 'Create Top index',
        icon: 'pi pi-plus',
        command: () => this.CreateTopIndex(),
      },
      {
        label: 'Create Child index',
        icon: 'pi pi-plus',
        command: () => this.CreateChildIndex(),
      },
      {
        label: 'Edit Index',
        icon: 'pi pi-file-edit',
        command: () => this.EditIndexName(),
      },
      {
        label: 'Delete Index',
        icon: 'pi pi-times',
        command: () => this.DeleteIndex(),
      },
    ];
  }
  
  CreateTopIndex() {
    this.ref = this.dialogService.open(TextIndexBuilderComponent, {
      header: 'Create top-level index',
      width: '600px',
      data: {
        index: new IndexModel({
          headerId: this.projectService.$currentHeader.value?._id,
        }),
      }
    });
  }

  DeleteIndex() {
    let inx = this.projectService.$currentIndex.value;
    if (inx && inx.headerId) {
      this.confirmationService.confirm({
        key: 'index-delete',
        header: 'Delete',
        message: 'Are you sure you want to delete the selected index?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        accept: () => {
          this.projectService.DeleteIndex(inx).then(() => {
            this.projectService.GetIndeces(inx.headerId!);
          })
        }
      })
    }
  }

  EditIndexName() {
    let inx = this.projectService.$currentIndex.value;
    if (inx) {
      this.ref = this.dialogService.open(TextIndexItemEditorComponent, {
        header: 'Edit index name and order',
        width: `600px`,
        modal: true,
        data: {
          index: new IndexModel({
            _id: inx._id,
            parentId: inx.parentId,
            headerId: inx.headerId,
            name: inx.name,
            order: inx.order,
            bookmarked: inx.bookmarked,
          }),
        }
      });
    }
  }

  CreateChildIndex() {
    let inx = this.projectService.$currentIndex.value;
    if (inx && inx._id) {
      this.ref = this.dialogService.open(TextIndexBuilderComponent, {
        header: 'Create child index',
        width: '600px',
        data: {
          index: new IndexModel({
            parentId: inx._id,
            headerId: inx.headerId,
            name: inx.name,
          })
        }
      });
    }
  }

  isExtendable(id: string): boolean {
    return (
      this.projectService.$currentIndeces.value?.find(
        (i) => i.parentId == id
      ) !== undefined
    );
  }

  getChildren(id: string): TreeNode[] | undefined {
    return this.projectService.$currentIndeces.value
      ?.filter((i) => i.parentId == id)
      .sort((a, b) => (a.order > b.order ? 1 : -1))
      .map((index) => this.createNode(index));
  }

  createNode(index: IndexModel): TreeNode {
    return {
      key: index._id,
      label: index.name,
      leaf: this.isExtendable(index._id as string),
      children: this.getChildren(index._id as string),
    };
  }

  Select(event: any) {
    this.projectService.$currentIndex.next(
      this.projectService.$currentIndeces.value?.find(
        (i) => i._id == event.node.key
      )
    );
    this.projectService.$currentIndexListPosition.next(
      this.projectService.$currentIndeces.value?.indexOf(
        this.projectService.$currentIndex.value!
      )
    );
    this.projectService.$currentForm.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
    this.projectService.$currentMorphs.next([]);
    this.projectService.$selectedDefinition.next(undefined);
    this.projectService.GetChunk(event.node.key);
  }

  Unselect(event: any) {
    this.projectService.$currentForm.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
    this.projectService.$currentMorphs.next([]);
    this.projectService.$currentChunk.next(undefined);
    this.projectService.$selectedDefinition.next(undefined);
  }

  nodeExpand(event: any) {
    if (!event.node.children) {
      this.loading = true;
      setTimeout(() => {
        event.node.children = [];
        for (let i = 0; i < 3; i++) {
          event.node.children.push({
            key: event.node.key + '-' + i,
            label: 'Node ' + event.node.key + '-' + i,
            leaf: false,
          });
        }
        this.loading = false;
        this.cd.markForCheck();
      }, 500);
    }
  }
}
