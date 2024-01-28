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
import { ProjectNewComponent } from './editor/components/project/components/project-new/project-new.component';
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
import { TextChunkEditorComponent } from './editor/components/project/components/text-chunk-editor/text-chunk-editor.component';
import { ConfirmComponent } from './widgets/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectNewComponent,
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
    TextChunkEditorComponent,
    ConfirmComponent
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
    MatChipsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
