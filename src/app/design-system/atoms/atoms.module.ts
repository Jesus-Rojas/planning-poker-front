import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';

import { AvatarFieldComponent } from './components/avatar-field/avatar-field.component';
import { ButtonFieldComponent } from './components/button-field/button-field.component';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { RadioButtonFieldComponent } from './components/radio-button-field/radio-button-field.component';
import { FormsModule } from '@angular/forms';
import { getFeatherIcons } from '@shared/utils';

@NgModule({
  declarations: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    InputFieldComponent,
    PokerChipComponent,
    RadioButtonFieldComponent,
    SelectFieldComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(getFeatherIcons(['AlertTriangle', 'Check'])),
    FormsModule,
  ],
  exports: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    InputFieldComponent,
    PokerChipComponent,
    RadioButtonFieldComponent,
    SelectFieldComponent,
  ],
})
export class AtomsModule {}
