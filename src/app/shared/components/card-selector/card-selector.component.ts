import { Component, OnInit } from '@angular/core';
import { CardSelector, CardSelectorType, PokerCardSize } from '@shared/types';
import { getId } from '@shared/utils';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss'
})
export class CardSelectorComponent implements OnInit {
  cards: CardSelector[] = [];

  CardSelectorType = CardSelectorType;
  PokerCardSize = PokerCardSize;

  ngOnInit(): void {
    const generateCard = (type: CardSelectorType, value: string) => ({
      id: getId(),
      type,
      value,
    });

    const cardsText = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?']
      .map((value) => generateCard(CardSelectorType.Text, value));

    const cardsIcon = ['/images/coffe.png'].map((value) => generateCard(CardSelectorType.Icon, value));

    this.cards = [
      ...cardsText,
      ...cardsIcon,
    ];
  }
}
