import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

import { AtomsModule } from '@design-system/atoms/atoms.module';
import { getFeatherIcons } from '@shared/utils';
import { ModalComponent } from './components/modal/modal.component';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    ModalComponent,
    ToastComponent,
  ],
  imports: [
    AtomsModule,
    CommonModule,
    FeatherModule.pick(getFeatherIcons(['AlertTriangle', 'Check', 'X', 'Info'])),
  ],
  exports: [
    ModalComponent,
    ToastComponent,
  ],
  providers: [
    ToastService,
  ],
})
export class MoleculesModule { }
