import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ButtonFieldComponent implements OnInit, OnChanges {
  @Input() variant = ButtonFieldVariantEnum.Primary;
  @Input() size = ButtonFieldSizeEnum.Medium;
  @Input() color = ButtonFieldColorEnum.DarkPurple;
  @Input() icon = ButtonFieldIconEnum.None;
  @Input() disabled: HTMLButtonElement['disabled'] = false;
  @Input() type: HTMLButtonElement['type'] = 'button';

  classVariant = '';
  classSize = '';
  classColor = '';
  classIcon = '';

  updateClassIcon() {
    const classes = {
      [ButtonFieldIconEnum.None]: 'icon-none',
      [ButtonFieldIconEnum.Left]: 'icon-left',
      [ButtonFieldIconEnum.Right]: 'icon-right',
    };
    this.classIcon = classes[this.icon];
  }

  updateClassColor() {
    const classes = {
      [ButtonFieldColorEnum.DarkPurple]: 'color-dark-purple',
      [ButtonFieldColorEnum.DarkWhite]: 'color-dark-white',
      [ButtonFieldColorEnum.LigthPurple]: 'color-ligth-purple',
    };
    this.classColor = classes[this.color];
  }

  updateClassVariant() {
    const classes = {
      [ButtonFieldVariantEnum.Primary]: 'variant-primary',
      [ButtonFieldVariantEnum.Secondary]: 'variant-secondary',
      [ButtonFieldVariantEnum.Tertiary]: 'variant-tertiary',
    };
    this.classVariant = classes[this.variant];
  }

  updateClassSize() {
    const classes = {
      [ButtonFieldSizeEnum.Medium]: 'size-medium',
      [ButtonFieldSizeEnum.Small]: 'size-small',
    };
    this.classSize = classes[this.size];
  }

  ngOnInit(): void {
    this.updateClassSize();
    this.updateClassVariant();
    this.updateClassColor();
    this.updateClassIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) this.updateClassSize();
    if (changes['variant']) this.updateClassVariant();
    if (changes['color']) this.updateClassColor();
    if (changes['icon']) this.updateClassIcon();
  }
}
