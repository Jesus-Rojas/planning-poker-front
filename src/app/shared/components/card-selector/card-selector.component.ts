import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardSelectorService } from '@shared/services/card-selector.service';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { CardSelector, CardSelectorTypeEnum, PokerCard, PokerCardSizeEnum, PokerCardVariantEnum } from '@shared/types';
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
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) { }

  cards: CardSelector[] = [];
  meUser: PokerCard | undefined = undefined;
  subscriptions = new Subscription();

  CardSelectorType = CardSelectorTypeEnum;
  PokerCardSize = PokerCardSizeEnum;
  PokerCardVariant = PokerCardVariantEnum;

  handlePokerCard(cardSelected: string) {
    const someCardIsSelected = this.cards.some((card) => card.isSelected);
    if (someCardIsSelected) return;
    if (!this.meUser) return;
    const gameUuid = this.localStorageService.getGame() ?? '';
    const userUuid = this.localStorageService.getUser() ?? '';

    const updateMeCardSelectedSubscription =
      this.gameService.updateMeCardSelected(gameUuid, userUuid, cardSelected).subscribe();
    this.subscriptions.add(updateMeCardSelectedSubscription);

    this.pokerTableService.updateMeUser({ ...this.meUser, isSelected: true, cardSelected });
    this.pokerTableService.organizeTablePositionCard();
  }

  generateCard(type: CardSelectorTypeEnum, value: string) {
    return {
      id: value,
      type,
      value,
      isSelected: false,
    };
  }

  ngOnInit(): void {
    const cardsText = ['0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?']
      .map((value) => this.generateCard(CardSelectorTypeEnum.Text, value));

    const cardsIcon = ['/images/coffe.png']
      .map((value) => this.generateCard(CardSelectorTypeEnum.Icon, value));

    this.cardSelectorService.updateCards([...cardsText, ...cardsIcon]);

    const cardsSubscription = this.cardSelectorService
      .cards$
      .subscribe((cards) => (this.cards = cards));

    this.subscriptions.add(cardsSubscription);

    const meUserSubscription = this.pokerTableService
      .meUser$
      .subscribe((meUser) => {
        console.log(meUser);

        this.meUser = meUser;
        this.cardSelectorService.updateCards(
          this.cards.map((card) => ({ ...card, isSelected: card.id === meUser?.cardSelected }))
        );
      });

    this.subscriptions.add(meUserSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
