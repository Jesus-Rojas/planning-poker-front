import { Component } from '@angular/core';
import { HeaderStatus } from '../../types/header-status.enum';
import { ButtonFieldColor } from '../../../design-system/atoms/types/button-field-color.enum';
import { ButtonFieldVariant } from '../../../design-system/atoms/types/button-field-variant.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  status: HeaderStatus = HeaderStatus.InsideTheGame;
  ButtonFieldColor = ButtonFieldColor;
  ButtonFieldVariant = ButtonFieldVariant;
  HeaderStatus = HeaderStatus;
}
