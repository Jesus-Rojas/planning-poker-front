import { Component, Input } from '@angular/core';
import { ButtonFieldSize } from '../../types/button-field-size.enum';
import { ButtonFieldVariant } from '../../types/button-field-variant.enum';
import { ButtonFieldIcon } from '../../types/button-field-icon.enum';
import { ButtonFieldColor } from '../../types/button-field-color.enum';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrl: './button-field.component.scss'
})
export class ButtonFieldComponent {
  @Input() type: HTMLButtonElement['type'] = 'button';
  @Input() size: ButtonFieldSize = ButtonFieldSize.Medium;
  @Input() variant: ButtonFieldVariant = ButtonFieldVariant.Primary;
  @Input() icon: ButtonFieldIcon = ButtonFieldIcon.None;
  @Input() color: ButtonFieldColor = ButtonFieldColor.DarkPurple;
}
