import { Component, Input } from '@angular/core';
import {
  ButtonFieldSizeEnum,
  ButtonFieldVariantEnum,
  ButtonFieldIconEnum,
  ButtonFieldColorEnum,
} from './types';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrl: './button-field.component.scss',
})
export class ButtonFieldComponent {
  @Input() disabled: HTMLButtonElement['disabled'] = false;
  @Input() type: HTMLButtonElement['type'] = 'button';
  @Input() size: ButtonFieldSizeEnum = ButtonFieldSizeEnum.Medium;
  @Input() variant: ButtonFieldVariantEnum = ButtonFieldVariantEnum.Primary;
  @Input() icon: ButtonFieldIconEnum = ButtonFieldIconEnum.None;
  @Input() color: ButtonFieldColorEnum = ButtonFieldColorEnum.DarkPurple;

  ButtonFieldSizeEnum = ButtonFieldSizeEnum;
  ButtonFieldVariantEnum = ButtonFieldVariantEnum;
  ButtonFieldIconEnum = ButtonFieldIconEnum;
  ButtonFieldColorEnum = ButtonFieldColorEnum;
}
