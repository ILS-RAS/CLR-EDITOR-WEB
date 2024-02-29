import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DefaultComponent } from './editor/components/default/default.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './editor/components/sidebar/sidebar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectSelectorComponent } from './editor/components/project/components/project-selector/project-selector.component';
import { ProjectDashboardComponent } from './editor/components/project/components/project-dashboard/project-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { TextSelectorComponent } from './editor/components/project/components/text-selector/text-selector.component';
import { ProjectToolbarComponent } from './editor/components/project/components/project-toolbar/project-toolbar.component';
import {MatTreeModule} from '@angular/material/tree';
import { TextChunkComponent } from './editor/components/project/components/text-chunk/text-chunk.component';
import { TextIndexComponent } from './editor/components/project/components/text-index/text-index.component';
import {MatChipsModule} from '@angular/material/chips';
import { TextToolbarComponent } from './editor/components/project/components/text-toolbar/text-toolbar.component';
import { TextChunkElementComponent } from './editor/components/project/components/text-chunk-element/text-chunk-element.component';
import { TextIndexToolbarComponent } from './editor/components/project/components/text-index-toolbar/text-index-toolbar.component';
import { TextIndexItemToolbarComponent } from './editor/components/project/components/text-index-item-toolbar/text-index-item-toolbar.component';
import { DialogComponent } from './widgets/dialog/dialog.component';
import { TextHeaderEditorComponent } from './editor/components/project/components/text-header-editor/text-header-editor.component';
import { TextIndexItemEditorComponent } from './editor/components/project/components/text-index-item-editor/text-index-item-editor.component';
import { ConfirmComponent } from './widgets/confirm/confirm.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DictionaryDashboardComponent } from './editor/components/dictionary/components/dictionary-dashboard/dictionary-dashboard.component';
import { TaxonomyDashboardComponent } from './editor/components/taxonomy/components/taxonomy-dashboard/taxonomy-dashboard.component';
import { TextChunkEditorComponent } from './editor/components/project/components/text-chunk-editor/text-chunk-editor.component';
import { ProjectEditorComponent } from './editor/components/project/components/project-editor/project-editor.component';
import { BaseComponent } from './components/base/base/base.component';
import { TextIndexBuilderComponent } from './editor/components/project/components/text-index-builder/text-index-builder.component';
import {MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { UserDashboardComponent } from './editor/components/user/components/user-dashboard/user-dashboard.component';
import { UserListComponent } from './editor/components/user/components/user-list/user-list.component';
import { UserToolbarComponent } from './editor/components/user/components/user-toolbar/user-toolbar.component';
import { UserComponent } from './editor/components/user/components/user/user.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserProjectListComponent } from './editor/components/user/components/user-project-list/user-project-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserEditorComponent } from './editor/components/user/components/user-editor/user-editor.component';
import { TaxonomyIndexComponent } from './editor/components/taxonomy/components/taxonomy-index/taxonomy-index.component';
import { TaxonomyItemsComponent } from './editor/components/taxonomy/components/taxonomy-items/taxonomy-items.component';
import { DictionaryBuilderComponent } from './editor/components/dictionary/components/dictionary-builder/dictionary-builder.component';
import { EntryListComponent } from './editor/components/dictionary/components/entry-list/entry-list.component';
import { LemmaSelectorComponent } from './editor/components/dictionary/components/lemma-selector/lemma-selector.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import { DictionaryEditorComponent } from './editor/components/dictionary/components/dictionary-editor/dictionary-editor.component';
import { DictionarySelectorComponent } from './editor/components/dictionary/components/dictionary-selector/dictionary-selector.component';
import { EntryListToolbarComponent } from './editor/components/dictionary/components/entry-list-toolbar/entry-list-toolbar.component';
import { EntryListItemComponent } from './editor/components/dictionary/components/entry-list-item/entry-list-item.component';
import { TextIndexFilterComponent } from './editor/components/project/components/text-index-filter/text-index-filter.component';
import { EntryComponent } from './editor/components/dictionary/components/entry/entry.component';
import { EntryToolbarComponent } from './editor/components/dictionary/components/entry-toolbar/entry-toolbar.component';
import { EntryFilterComponent } from './editor/components/dictionary/components/entry-filter/entry-filter.component';
import { EntryElementEditorComponent } from './editor/components/dictionary/components/entry-element-editor/entry-element-editor.component';
import { EntryCardComponent } from './editor/components/dictionary/components/entry-card/entry-card.component';
import { LemmaViewComponent } from './editor/components/dictionary/components/entry-element-views/lemma-view/lemma-view.component';
import { MarkViewComponent } from './editor/components/dictionary/components/entry-element-views/mark-view/mark-view.component';
import { DefinitionViewComponent } from './editor/components/dictionary/components/entry-element-views/definition-view/definition-view.component';
import { IllustrationViewComponent } from './editor/components/dictionary/components/entry-element-views/illustration-view/illustration-view.component';
import { CollocationViewComponent } from './editor/components/dictionary/components/entry-element-views/collocation-view/collocation-view.component';
import { FormViewComponent } from './editor/components/dictionary/components/entry-element-views/form-view/form-view.component';
import { TextValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/text-value-editor/text-value-editor.component';
import { LemmaValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/lemma-value-editor/lemma-value-editor.component';
import { FormValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/form-value-editor/form-value-editor.component';
import { CollocationValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/collocation-value-editor/collocation-value-editor.component';
import { MarkValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/mark-value-editor/mark-value-editor.component';
import { IllustrationValueEditorComponent } from './editor/components/dictionary/components/entry-element-value-editors/illustration-value-editor/illustration-value-editor.component';
import { ViewSelectorComponent } from './editor/components/dictionary/components/entry-element-views/view-selector/view-selector.component';
import { MorphSelectorComponent } from './editor/components/morph/components/morph-selector/morph-selector.component';
import { NoteEditorComponent } from './editor/components/project/components/note-editor/note-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectSelectorComponent,
    ProjectDashboardComponent,
    TextSelectorComponent,
    ProjectToolbarComponent,
    TextChunkComponent,
    TextIndexComponent,
    TextToolbarComponent,
    TextChunkElementComponent,
    TextIndexToolbarComponent,
    TextIndexItemToolbarComponent,
    DialogComponent,
    TextHeaderEditorComponent,
    TextIndexItemEditorComponent,
    ConfirmComponent,
    DictionaryDashboardComponent,
    TaxonomyDashboardComponent,
    TextChunkEditorComponent,
    ProjectEditorComponent,
    BaseComponent,
    TextIndexBuilderComponent,
    UserDashboardComponent,
    UserListComponent,
    UserToolbarComponent,
    UserComponent,
    UserProjectListComponent,
    UserEditorComponent,
    TaxonomyIndexComponent,
    TaxonomyItemsComponent,
    DictionaryBuilderComponent,
    EntryListComponent,
    LemmaSelectorComponent,
    DictionaryEditorComponent,
    DictionarySelectorComponent,
    EntryListToolbarComponent,
    EntryFilterComponent,
    EntryListItemComponent,
    TextIndexFilterComponent,
    EntryComponent,
    EntryToolbarComponent,
    EntryElementEditorComponent,
    EntryCardComponent,
    LemmaViewComponent,
    MarkViewComponent,
    DefinitionViewComponent,
    IllustrationViewComponent,
    CollocationViewComponent,
    FormViewComponent,
    TextValueEditorComponent,
    LemmaValueEditorComponent,
    FormValueEditorComponent,
    CollocationValueEditorComponent,
    MarkValueEditorComponent,
    IllustrationValueEditorComponent,
    ViewSelectorComponent,
    MorphSelectorComponent,
    NoteEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatTreeModule,
    MatChipsModule,
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatStepperModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
