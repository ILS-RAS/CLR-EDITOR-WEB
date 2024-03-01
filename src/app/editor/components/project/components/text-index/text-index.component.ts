import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { HeaderModel } from '../../../../models/headerModel';
import { ProjectService } from '../../services/project.service';
import { IndexModel } from '../../../../models';
import { BaseComponent } from '../../../../../components/base/base/base.component';

export class DynamicFlatNode {
  constructor(
    public _id: string,
    public item: string,
    public parentId: string,
    public level = 1,
    public order:number,
    public expandable = false,
    public isLoading = false,
  ) {}
}
@Injectable()
export class DynamicDataSource implements OnDestroy {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  destroyed = new Subject();
  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _projectService: ProjectService,
  ) {}
  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.pipe(takeUntil(this.destroyed)).subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  isExtendable(id:string):boolean{
    return this._projectService.$currentIndeces.value?.find(i=>i.parentId == id) !== undefined;
  }

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._projectService.$currentIndeces.value?.filter(i=>i.parentId == node._id).sort((a, b) => (a.order > b.order ? 1 : -1));
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name => new DynamicFlatNode(name._id as string, name.name as string, node.parentId, node.level + 1, node.order, this.isExtendable(name._id as string)),
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 250);
  }
}
@Component({
  selector: 'app-text-index',
  templateUrl: './text-index.component.html',
  styleUrl: './text-index.component.scss'
})
export class TextIndexComponent extends BaseComponent implements OnInit {
  
  @Input() header?: HeaderModel;
  public indeces: IndexModel[] = [];
  constructor(private projectService: ProjectService) {
    super();
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, projectService);
  }
  
  ngOnInit(): void {
    this.projectService.$currentIndeces.pipe(takeUntil(this.destroyed)).subscribe(indeces =>{
      if(indeces){
        this.dataSource.data = indeces
        .filter(i=>!i.parentId).sort((a, b) => (a.order > b.order ? 1 : -1))
        .map(name => new DynamicFlatNode(name._id as string, name.name as string, name.parentId as string, 0, name.order, this.dataSource.isExtendable(name._id as string)))
      }
    });

  }
  
  Select(id: string) {
    this.projectService.$currentIndex.next(this.projectService.$currentIndeces.value?.find(i=>i._id == id));
    this.projectService.$currentForm.next(undefined);
    this.projectService.$currentVersionChunks.next(undefined);
    this.projectService.GetChunk(id);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
