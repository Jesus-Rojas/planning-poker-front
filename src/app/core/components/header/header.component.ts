import { Component } from '@angular/core';
import { HeaderStatusEnum } from '../../types/header-status.enum';
import {
  ButtonFieldColorEnum,
  ButtonFieldVariantEnum,
} from '../../../design-system/atoms/components/button-field/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  status: HeaderStatusEnum = HeaderStatusEnum.InsideTheGame;
  ButtonFieldColorEnum = ButtonFieldColorEnum;
  ButtonFieldVariantEnum = ButtonFieldVariantEnum;
  HeaderStatusEnum = HeaderStatusEnum;
}
