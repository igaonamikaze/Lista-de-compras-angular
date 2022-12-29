import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarlistaPageRoutingModule } from './criarlista-routing.module';

import { CriarlistaPage } from './criarlista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarlistaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CriarlistaPage]
})
export class CriarlistaPageModule {}
