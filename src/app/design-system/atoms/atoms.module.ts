import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { AvatarFieldComponent } from './components/avatar-field/avatar-field.component';
import { ButtonFieldComponent } from './components/button-field/button-field.component';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { RadioButtonFieldComponent } from './components/radio-button-field/radio-button-field.component';
import { FormsModule } from '@angular/forms';

const iconNames: (keyof typeof allIcons)[] = ['AlertTriangle', 'Check'];
const iconsFiltered = iconNames.reduce((acc, iconName) => ({ ...acc, [iconName]: allIcons[iconName] }), { });

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
    FeatherModule.pick(iconsFiltered),
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
