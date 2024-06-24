import { Component } from '@angular/core';
import { HeaderStatusEnum } from '../../types/header-status.enum';
import {
  ButtonFieldColorEnum,
  ButtonFieldVariantEnum,
} from '@design-system/atoms/components/button-field/types';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/components/avatar-field/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  headerStatus: HeaderStatusEnum = HeaderStatusEnum.CreateGame;
  avatarFieldVariant: AvatarFieldVariantEnum = AvatarFieldVariantEnum.TextPurpleLigth;
  avatarFieldSize: AvatarFieldSizeEnum = AvatarFieldSizeEnum.ExtraLarge;

  ButtonFieldColorEnum = ButtonFieldColorEnum;
  ButtonFieldVariantEnum = ButtonFieldVariantEnum;
  HeaderStatusEnum = HeaderStatusEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;
}
