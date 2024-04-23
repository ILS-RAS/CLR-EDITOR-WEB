import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DefaultComponent },
  ])],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
