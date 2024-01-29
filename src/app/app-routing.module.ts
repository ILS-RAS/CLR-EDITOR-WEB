import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DefaultComponent } from './editor/components/default/default.component';
import { ProjectDashboardComponent } from './editor/components/project/components/project-dashboard/project-dashboard.component';
import { DictionaryDashboardComponent } from './editor/components/dictionary/components/dictionary-dashboard/dictionary-dashboard.component';
import { TaxonomyDashboardComponent } from './editor/components/taxonomy/components/taxonomy-dashboard/taxonomy-dashboard.component';

const routes: Routes = [
  {
    path: 'accipe',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'proiectus',
    component: ProjectDashboardComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'lexicon',
    component: DictionaryDashboardComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'meta',
    component: TaxonomyDashboardComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
