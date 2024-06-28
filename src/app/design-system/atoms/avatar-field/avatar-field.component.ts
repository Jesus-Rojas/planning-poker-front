import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from './types';

@Component({
  selector: 'app-avatar-field',
  templateUrl: './avatar-field.component.html',
  styleUrl: './avatar-field.component.scss'
})
export class AvatarFieldComponent implements OnInit, OnChanges {
  @Input() variant = AvatarFieldVariantEnum.TextPurple;
  @Input() size = AvatarFieldSizeEnum.Small;
  @Input() icon = '/svgs/clock.svg';
  @Input() urlImage = '/images/avatar.jpeg';
  @Input() text = 'LU';

  classVariant = '';
  classSize = '';
  backgroundImageAvatar = '';
  backgroundImageIcon = '';
  isVariantText = false;
  isVariantIcon = false;

  updateClassVariant() {
    const classes = {
      [AvatarFieldVariantEnum.Icon]: 'variant-icon',
      [AvatarFieldVariantEnum.Image]: 'variant-image',
      [AvatarFieldVariantEnum.TextPurple]: 'variant-text-purple',
      [AvatarFieldVariantEnum.TextWhite]: 'variant-text-white',
      [AvatarFieldVariantEnum.TextPurpleLigth]: 'variant-text-purple-ligth',
    };
    this.classVariant = classes[this.variant];
  }

  updateIsVariantIcon() {
    this.isVariantIcon = this.variant === AvatarFieldVariantEnum.Icon;
  }

  updateIsVariantText() {
    this.isVariantText = [
      AvatarFieldVariantEnum.TextPurple,
      AvatarFieldVariantEnum.TextWhite,
      AvatarFieldVariantEnum.TextPurpleLigth,
    ].includes(this.variant)
  }

  updateClassSize() {
    const classes = {
      [AvatarFieldSizeEnum.Small]: 'size-small',
      [AvatarFieldSizeEnum.Medium]: 'size-medium',
      [AvatarFieldSizeEnum.Large]: 'size-large',
      [AvatarFieldSizeEnum.ExtraLarge]: 'size-extra-large',
    };
    this.classSize = classes[this.size];
  }

  updateBackgroundImageIcon() {
    this.backgroundImageIcon = `url(${this.icon})`;
  }

  updateBackgroundImageAvatar() {
    this.backgroundImageAvatar = [
      AvatarFieldVariantEnum.Icon,
      AvatarFieldVariantEnum.Image
    ].includes(this.variant) ? 'url(' + this.urlImage + ')' : '';
  }

  ngOnInit(): void {
    this.updateBackgroundImageAvatar();
    this.updateBackgroundImageIcon();
    this.updateClassSize();
    this.updateIsVariantText();
    this.updateIsVariantIcon();
    this.updateClassVariant();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.updateBackgroundImageIcon();
    }

    if (changes['size']) {
      this.updateClassSize();
    }

    if (changes['variant']) {
      this.updateIsVariantText();
      this.updateIsVariantIcon();
      this.updateClassVariant();
    }

    if (changes['variant'] || changes['urlImage']) {
      this.updateBackgroundImageAvatar();
    }
  }
}
