import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardSelectorService } from '@shared/services/card-selector.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { CardSelector, CardSelectorType, PokerCard, PokerCardSize, PokerCardVariant } from '@shared/types';
import { getId } from '@shared/utils';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss'
})
export class CardSelectorComponent implements OnInit, OnDestroy {
  constructor(
    private pokerTableService: PokerTableService,
    public cardSelectorService: CardSelectorService,
  ) { }

  cards: CardSelector[] = [];
  meUser: PokerCard | undefined = undefined;
  subscriptions = new Subscription();

  CardSelectorType = CardSelectorType;
  PokerCardSize = PokerCardSize;
  PokerCardVariant = PokerCardVariant;

  handlePokerCard(cardId: string) {
    const someCardIsSelected = this.cards.some((card) => card.isSelected);
    if (someCardIsSelected) return;
    if (!this.meUser) return;
    this.pokerTableService.updateMeUser({ ...this.meUser, isSelected: true, cardId });
    this.pokerTableService.organizeTablePositionCard();
  }

  generateCard(type: CardSelectorType, value: string) {
    return {
      id: getId(),
      type,
      value,
      isSelected: false,
    };
  }

  ngOnInit(): void {
    const cardsText = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?']
      .map((value) => this.generateCard(CardSelectorType.Text, value));

    const cardsIcon = ['/images/coffe.png']
      .map((value) => this.generateCard(CardSelectorType.Icon, value));

    this.cardSelectorService.updateCards([...cardsText, ...cardsIcon]);

    const cardsSubscription = this.cardSelectorService
      .cards$
      .subscribe((cards) => (this.cards = cards));

    this.subscriptions.add(cardsSubscription);

    const meUserSubscription = this.pokerTableService
      .meUser$
      .subscribe((meUser) => {
        this.meUser = meUser;
        this.cardSelectorService.updateCards(
          this.cards.map((card) => ({ ...card, isSelected: card.id === meUser?.cardId }))
        );
      });

    this.subscriptions.add(meUserSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
