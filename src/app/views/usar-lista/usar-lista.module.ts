import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsarListaPageRoutingModule } from './usar-lista-routing.module';

import { UsarListaPage } from './usar-lista.page';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    UsarListaPageRoutingModule,
  ],
  declarations: [UsarListaPage]
})
export class UsarListaPageModule {}
