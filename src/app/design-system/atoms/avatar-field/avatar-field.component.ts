import { Component, Input } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from './types';

@Component({
  selector: 'app-avatar-field',
  templateUrl: './avatar-field.component.html',
  styleUrl: './avatar-field.component.scss'
})
export class AvatarFieldComponent {
  @Input() size: AvatarFieldSizeEnum = AvatarFieldSizeEnum.Small;
  @Input() variant: AvatarFieldVariantEnum = AvatarFieldVariantEnum.TextPurple;
  @Input() text = 'LU';
  @Input() urlImage = '/images/avatar.jpeg';
  @Input() icon = '/svgs/clock.svg';

  AvatarFieldSizeEnum = AvatarFieldSizeEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
}
