import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarlistaPage } from './criarlista.page';

const routes: Routes = [
  {
    path: '',
    component: CriarlistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarlistaPageRoutingModule {}
