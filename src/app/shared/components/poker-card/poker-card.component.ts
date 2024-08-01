import { Component, Input } from '@angular/core';
import { PokerCardSizeEnum, PokerCardVariantEnum } from '@shared/types';

@Component({
  selector: 'app-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.scss'
})
export class PokerCardComponent {
  @Input() size: PokerCardSizeEnum = PokerCardSizeEnum.Small;
  @Input() variant: PokerCardVariantEnum = PokerCardVariantEnum.Default;
  @Input() isVisible = true;
  @Input() isSelected = false;

  PokerCardSize = PokerCardSizeEnum;
  PokerCardVariant = PokerCardVariantEnum;
}
