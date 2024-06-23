import { Component } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '../avatar-field/types';

@Component({
  selector: 'app-poker-chip',
  templateUrl: './poker-chip.component.html',
  styleUrl: './poker-chip.component.scss'
})
export class PokerChipComponent {
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
}
