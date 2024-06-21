import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { ButtonFieldComponent } from './components/button-field/button-field.component';

@NgModule({
  declarations: [
    SelectFieldComponent,
    TextFieldComponent,
    PokerChipComponent,
    ButtonFieldComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SelectFieldComponent,
    TextFieldComponent,
    PokerChipComponent,
    ButtonFieldComponent,
  ],
})
export class AtomsModule { }
