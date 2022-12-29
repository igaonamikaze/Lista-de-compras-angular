import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsarListaPage } from './usar-lista.page';

const routes: Routes = [
  {
    path: '',
    component: UsarListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsarListaPageRoutingModule {}
