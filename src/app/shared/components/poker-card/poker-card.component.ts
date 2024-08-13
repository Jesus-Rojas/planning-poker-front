import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokerCardSizeEnum, PokerCardVariantEnum } from '@shared/types';

@Component({
  selector: 'app-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.scss'
})
export class PokerCardComponent implements OnInit, OnChanges {
  @Input() size: PokerCardSizeEnum = PokerCardSizeEnum.Small;
  @Input() variant: PokerCardVariantEnum = PokerCardVariantEnum.Default;
  @Input() isVisible = true;
  @Input() isSelected = false;

  PokerCardSize = PokerCardSizeEnum;
  PokerCardVariant = PokerCardVariantEnum;

  classContainer = '';
  classCard = '';

  updateClassCard() {
    const classesList = ['card'];
    if (this.size === PokerCardSizeEnum.Small) classesList.push('small');
    if (this.size === PokerCardSizeEnum.Medium) classesList.push('medium');
    if (this.variant === PokerCardVariantEnum.Default) classesList.push('default');
    if (this.variant === PokerCardVariantEnum.Picker) classesList.push('picker');
    if (this.isSelected) classesList.push('is-selected');
    this.classCard = classesList.join(' ');
  }

  updateClassContainer() {
    const classesList = ['container'];
    if (this.size === PokerCardSizeEnum.Small) classesList.push('small');
    if (this.size === PokerCardSizeEnum.Medium) classesList.push('medium');
    if (!this.isVisible) classesList.push('hidden');
    this.classContainer = classesList.join(' ');
  }

  ngOnInit(): void {
    this.updateClassContainer();
    this.updateClassCard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (['size', 'isVisible'].some((prop) => changes[prop])) this.updateClassContainer();
    if (['size', 'variant', 'isSelected'].some((prop) => changes[prop])) this.updateClassCard();
  }
}
