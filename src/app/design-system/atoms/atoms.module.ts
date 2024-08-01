import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarFieldComponent } from './avatar-field/avatar-field.component';
import { ButtonFieldComponent } from './button-field/button-field.component';
import { SelectFieldComponent } from './select-field/select-field.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { RadioButtonFieldComponent } from './radio-button-field/radio-button-field.component';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { SpinnerFieldComponent } from './spinner-field/spinner-field.component';

@NgModule({
  declarations: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    InputFieldComponent,
    RadioButtonFieldComponent,
    SelectFieldComponent,
    SpinnerFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
  ],
  exports: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    InputFieldComponent,
    RadioButtonFieldComponent,
    SelectFieldComponent,
    SpinnerFieldComponent,
  ],
})
export class AtomsModule {}
