import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoreportePage } from './nuevoreporte';

@NgModule({
  declarations: [
    NuevoreportePage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoreportePage),
  ],
})
export class NuevoreportePageModule {}
