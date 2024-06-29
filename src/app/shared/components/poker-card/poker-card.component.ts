import { Component, Input } from '@angular/core';
import { PokerCardSize, PokerCardVariant } from '@shared/types';

@Component({
  selector: 'app-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.scss'
})
export class PokerCardComponent {
  @Input() size: PokerCardSize = PokerCardSize.Small;
  @Input() variant: PokerCardVariant = PokerCardVariant.Default;
  @Input() isVisible = true;

  PokerCardSize = PokerCardSize;
  PokerCardVariant = PokerCardVariant;
}
