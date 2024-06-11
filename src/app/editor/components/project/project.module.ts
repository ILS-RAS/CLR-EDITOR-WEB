import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InplaceModule } from 'primeng/inplace';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitterModule } from 'primeng/splitter';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';

import { DefaultComponent } from './components/default/default.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';
import { ProjectToolbarComponent } from './components/project-toolbar/project-toolbar.component';
import { TextChunkEditorComponent } from './components/text-chunk-editor/text-chunk-editor.component';
import { TextChunkElementComponent } from './components/text-chunk-element/text-chunk-element.component';
import { TextChunkComponent } from './components/text-chunk/text-chunk.component';
import { TextIndexItemEditorComponent } from './components/text-index-item-editor/text-index-item-editor.component';
import { TextIndexTreeComponent } from './components/text-index-tree/text-index-tree.component';
import { TextHeaderEditorComponent } from './components/text-header-editor/text-header-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
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
    TextHeaderEditorComponent
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
    SpeedDialModule,
    TieredMenuModule,
    IconFieldModule,
    InputIconModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    ScrollPanelModule,
    DividerModule
  ],
  providers:[DialogService]
})
export class ProjectModule { }
