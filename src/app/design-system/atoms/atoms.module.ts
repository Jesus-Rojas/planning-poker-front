import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';

@NgModule({
  declarations: [
    SelectFieldComponent,
    TextFieldComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SelectFieldComponent,
    TextFieldComponent,
  ],
})
export class AtomsModule { }
