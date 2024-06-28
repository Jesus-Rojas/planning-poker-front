import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AtomsModule } from '@design-system/atoms/atoms.module';
import { FeatherModule } from 'angular-feather';

import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';

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
