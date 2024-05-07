import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';

import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelModule } from 'primeng/panel';
import { InplaceModule } from 'primeng/inplace';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ProjectToolbarComponent } from './components/project-toolbar/project-toolbar.component';
import { DefaultComponent } from './components/default/default.component';
import { TextIndexTreeComponent } from './components/text-index-tree/text-index-tree.component';
import { TextChunkComponent } from './components/text-chunk/text-chunk.component';
import { TextChunkEditorComponent } from './components/text-chunk-editor/text-chunk-editor.component';
import { TextIndexItemEditorComponent } from './components/text-index-item-editor/text-index-item-editor.component';
import { TextChunkElementComponent } from './components/text-chunk-element/text-chunk-element.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';
import { DialogComponent } from '../../../widgets/dialog/dialog.component';
@NgModule({
  declarations: [
    DefaultComponent,
    ProjectToolbarComponent,
    TextIndexTreeComponent,
    TextChunkComponent,
    TextChunkEditorComponent,
    TextIndexItemEditorComponent,
    TextIndexTreeComponent,
    TextChunkElementComponent,
    ProjectSelectorComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    ProjectRoutingModule,
    SplitterModule,
    ToolbarModule,
    MenuModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TreeModule,
    ContextMenuModule,
    PanelModule,
    InplaceModule,
    SidebarModule,
    MatDialogModule,
    SpeedDialModule,
    TieredMenuModule,
    IconFieldModule,
    InputIconModule
  ]
})
export class ProjectModule { }
