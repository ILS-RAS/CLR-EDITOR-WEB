import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  imports: [RouterModule.forRoot([{
    path:'', component: LayoutComponent,
    children: [
      { path: '', canActivate: [ AuthGuard ], loadChildren: () => import('./public/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'search', canActivate: [ AuthGuard ], loadChildren: () => import('./public/components/search/search.module').then(m => m.SearchModule) },
      { path: 'text', canActivate: [ AuthGuard ], loadChildren: () => import('./public/components/text/text.module').then(m => m.TextModule) },
      { path: 'project', canActivate: [ AuthGuard ], loadChildren: () => import('./editor/components/project/project.module').then(m => m.ProjectModule) },
      { path: 'dictionary', canActivate: [ AuthGuard ], loadChildren: () => import('./editor/components/dictionary/dictionary.module').then(m => m.DictionaryModule) },
      { path: 'morph', canActivate: [ AuthGuard ], loadChildren: () => import('./editor/components/morph/morph.module').then(m => m.MorphModule) },
      { path: 'meta', canActivate: [ AuthGuard ], loadChildren: () => import('./editor/components/taxonomy/taxonomy.module').then(m => m.TaxonomyModule) },
      { path: 'user', canActivate: [ AuthGuard ], loadChildren: () => import('./editor/components/user/user.module').then(m => m.UserModule) }
  ]
  },
  { path: 'auth', loadChildren: () => import('./editor/components/auth/auth.module').then(m => m.AuthModule) }
], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
