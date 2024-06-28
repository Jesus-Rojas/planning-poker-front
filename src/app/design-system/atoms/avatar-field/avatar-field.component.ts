import { Component, Input } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from './types';

@Component({
  selector: 'app-avatar-field',
  templateUrl: './avatar-field.component.html',
  styleUrl: './avatar-field.component.scss'
})
export class AvatarFieldComponent {
  private _variant = AvatarFieldVariantEnum.TextPurple;
  private _size = AvatarFieldSizeEnum.Small;
  private _urlImage = '/images/avatar.jpeg';
  private _icon = '/svgs/clock.svg';

  classVariant = '';
  classSize = '';
  backgroundImageAvatar = '';
  backgroundImageIcon = '';
  isVariantText = false;
  isVariantIcon = false;

  @Input()
  set variant(variant: AvatarFieldVariantEnum) {
    this._variant = variant;

    const classes = {
      [AvatarFieldVariantEnum.Icon]: 'variant-icon',
      [AvatarFieldVariantEnum.Image]: 'variant-image',
      [AvatarFieldVariantEnum.TextPurple]: 'variant-text-purple',
      [AvatarFieldVariantEnum.TextWhite]: 'variant-text-white',
      [AvatarFieldVariantEnum.TextPurpleLigth]: 'variant-text-purple-ligth',
    };
    this.classVariant = classes[variant];

    this.isVariantText = [
      AvatarFieldVariantEnum.TextPurple,
      AvatarFieldVariantEnum.TextWhite,
      AvatarFieldVariantEnum.TextPurpleLigth,
    ].includes(variant)

    this.isVariantIcon = variant === AvatarFieldVariantEnum.Icon;
  }

  get variant() {
    return this._variant;
  }

  @Input()
  set size(size: AvatarFieldSizeEnum) {
    this._size = size;
    const classes = {
      [AvatarFieldSizeEnum.Small]: 'size-small',
      [AvatarFieldSizeEnum.Medium]: 'size-medium',
      [AvatarFieldSizeEnum.Large]: 'size-large',
      [AvatarFieldSizeEnum.ExtraLarge]: 'size-extra-large',
    };
    this.classSize = classes[size];
  }

  get size() {
    return this._size;
  }

  @Input()
  set urlImage(urlImage: string) {
    this._urlImage = urlImage;
    if ([AvatarFieldVariantEnum.Icon, AvatarFieldVariantEnum.Image].includes(this.variant)) {
      this.backgroundImageAvatar = 'url(' + urlImage + ')';
    }
  }

  get urlImage() {
    return this._urlImage;
  }

  @Input()
  set icon(icon: string) {
    this._icon = icon;
    this.backgroundImageIcon = `url(${icon})`;
  }

  get icon() {
    return this._icon;
  }

  @Input() text = 'LU';

  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
}
