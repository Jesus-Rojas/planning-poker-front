import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarFieldComponent } from './components/avatar-field/avatar-field.component';
import { ButtonFieldComponent } from './components/button-field/button-field.component';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { TextFieldComponent } from './components/text-field/text-field.component';

@NgModule({
  declarations: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    PokerChipComponent,
    SelectFieldComponent,
    TextFieldComponent,
  ],
  imports: [CommonModule],
  exports: [
    AvatarFieldComponent,
    ButtonFieldComponent,
    PokerChipComponent,
    SelectFieldComponent,
    TextFieldComponent,
  ],
})
export class AtomsModule {}
