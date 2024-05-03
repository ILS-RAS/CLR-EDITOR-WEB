import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { ChunkViewModel, HeaderModel, IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';
import { ProjectService } from '../../services/project.service';
import { takeUntil } from 'rxjs';
import { TextIndexBuilderComponent } from '../text-index-builder/text-index-builder.component';
import { MatDialog } from '@angular/material/dialog';
import { TextIndexItemEditorComponent } from '../text-index-item-editor/text-index-item-editor.component';
import { ConfirmComponent } from '../../../../../widgets/confirm/confirm.component';
import { TextChunkEditorComponent } from '../text-chunk-editor/text-chunk-editor.component';

@Component({
  selector: 'app-text-index-tree',
  templateUrl: './text-index-tree.component.html',
  styleUrl: './text-index-tree.component.scss',
})
export class TextIndexTreeComponent extends BaseComponent {
  @Input() header?: HeaderModel;

  public indeces: IndexModel[] = [];

  loading: boolean = false;

  nodes!: TreeNode[];

  items!: MenuItem[];

  constructor(
    private cd: ChangeDetectorRef,
    private projectService: ProjectService,
    public dialog: MatDialog
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

    this.items = [
      {
        label: 'Create Top index',
        icon: 'pi pi-plus',
        command: () => this.CreateChildIndex(),
      },
      {
        label: 'Create Child index',
        icon: 'pi pi-plus',
        command: () => this.CreateChildIndex(),
      },
      {
        label: 'Create Chunk',
        icon: 'pi pi-plus',
        command: () => this.CreateChunk(),
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

  CreateChunk() {
    let inx = this.projectService.$currentIndex.value;
    if(inx && inx._id){
      this.dialog.open(TextChunkEditorComponent, {
        width: '600px',
        data: new ChunkViewModel({ indexId: inx._id}),
      });
    }
  }
  
  CreateTopIndex() {
    this.dialog.open(TextIndexBuilderComponent, {
      width: '600px',
      data: new IndexModel({
        headerId: this.projectService.$currentHeader.value?._id,
      }),
    });
  }

  DeleteIndex() {
    let inx = this.projectService.$currentIndex.value;
    this.dialog
      .open(ConfirmComponent, { width: `600px`, hasBackdrop: true, data: inx })
      .afterClosed()
      .subscribe((res) => {
        if (res && inx && inx.headerId) {
          this.projectService.DeleteIndex(inx).then(() => {
            if (inx && inx.headerId) {
              this.projectService.GetIndeces(inx.headerId);
            }
          });
        }
      });
  }

  EditIndexName() {
    let inx = this.projectService.$currentIndex.value;
    if (inx) {
      this.dialog.open(TextIndexItemEditorComponent, {
        width: `600px`,
        hasBackdrop: true,
        data: new IndexModel({
          _id: inx._id,
          parentId: inx.parentId,
          headerId: inx.headerId,
          name: inx.name,
          order: inx.order,
          bookmarked: inx.bookmarked,
        }),
      });
    }
  }

  CreateChildIndex() {
    let inx = this.projectService.$currentIndex.value;
    if (inx && inx._id) {
      this.dialog.open(TextIndexBuilderComponent, {
        width: '600px',
        data: new IndexModel({
          parentId: inx._id,
          headerId: inx.headerId,
          name: inx.name,
        }),
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
    this.projectService.$currentForm.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
    this.projectService.GetChunk(event.node.key);
  }

  Unselect(event: any) {
    this.projectService.$currentForm.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
    this.projectService.$currentChunk.next(undefined);
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