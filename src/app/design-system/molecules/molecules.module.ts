import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtomsModule } from '@design-system/atoms/atoms.module';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    ModalComponent,
    ToastComponent,
  ],
  imports: [
    AtomsModule,
    CommonModule,
    FeatherModule,
  ],
  exports: [
    ModalComponent,
    ToastComponent,
  ],
})
export class MoleculesModule { }
