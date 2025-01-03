import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing.module';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InplaceModule } from 'primeng/inplace';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
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
import { ElementSelectorComponent } from './components/element-selector/element-selector.component';
import { ElementToolbarComponent } from './components/element-toolbar/element-toolbar.component';
import { ElementEditorComponent } from './components/element-editor/element-editor.component';
import { TextIndexBuilderComponent } from './components/text-index-builder/text-index-builder.component';

@NgModule({
  declarations: [
    DefaultComponent,
    ProjectToolbarComponent,
    TextIndexTreeComponent,
    TextIndexBuilderComponent,
    TextChunkComponent,
    TextChunkEditorComponent,
    TextIndexItemEditorComponent,
    TextIndexTreeComponent,
    TextChunkElementComponent,
    ProjectSelectorComponent,
    TextHeaderEditorComponent,
    ElementSelectorComponent,
    ElementToolbarComponent,
    ElementEditorComponent,
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
    DividerModule,
    TableModule,
    InputTextModule,
    ChipsModule,
    MessageModule,
    DynamicDialogModule,
    TooltipModule,
    InputNumberModule,
    CheckboxModule,
    ProgressSpinnerModule,
  ],
  providers:[DialogService]
})
export class ProjectModule { }
