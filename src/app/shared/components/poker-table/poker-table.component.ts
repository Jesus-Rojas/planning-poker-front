import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AvatarFieldSizeEnum,
  AvatarFieldVariantEnum,
} from '@design-system/atoms/avatar-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import {
  GameStatusEnum,
  PokerCard,
  RoleEnum,
  TablePositionCard,
  TablePositionEnum,
} from '@shared/types';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss',
})
export class PokerTableComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  someUserHasSelectedOnePokerCard = false;
  meUser: PokerCard | undefined = undefined;
  gameStatus: GameStatusEnum = GameStatusEnum.Reveal;
  tablePositionCard: TablePositionCard = {
    [TablePositionEnum.Top]: [],
    [TablePositionEnum.Bottom]: [],
    [TablePositionEnum.Left]: [],
    [TablePositionEnum.Right]: [],
  };

  constructor(
    public pokerTableService: PokerTableService,
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) {}

  TablePosition = TablePositionEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;
  RoleEnum = RoleEnum;
  GameStatusEnum = GameStatusEnum;

  revealCards() {
    this.pokerTableService.updateGameStatus(GameStatusEnum.Loading);
    const gameUuid = this.localStorageService.getGame() ?? '';
    const revealCardsSubscription = this.gameService
      .revealCards(gameUuid)
      .pipe(delay(2000))
      .subscribe(({ average, scoreCards }) => {
        this.pokerTableService.updateGameStatus(GameStatusEnum.Reset);
        this.pokerTableService.updateAverage(average);
        this.pokerTableService.updateScoreCards(scoreCards);
      });
    this.subscription.add(revealCardsSubscription);
  }

  resetGame() {
    this.pokerTableService.updateGameStatus(GameStatusEnum.Reveal);
    this.pokerTableService.resetGame();
  }

  ngOnInit(): void {
    const someUserHasSelectedOnePokerCardSubscription =
      this.pokerTableService.someUserHasSelectedOnePokerCard$.subscribe(
        (someUserHasSelectedOnePokerCard) =>
          (this.someUserHasSelectedOnePokerCard =
            someUserHasSelectedOnePokerCard)
      );
    this.subscription.add(someUserHasSelectedOnePokerCardSubscription);

    const meUserSubscription = this.pokerTableService.meUser$.subscribe(
      (meUser) => (this.meUser = meUser)
    );
    this.subscription.add(meUserSubscription);

    const gameStatusSubscription = this.pokerTableService.gameStatus$.subscribe(
      (gameStatus) => (this.gameStatus = gameStatus)
    );
    this.subscription.add(gameStatusSubscription);

    const tablePositionCardSubscription =
      this.pokerTableService.tablePositionCard$.subscribe(
        (tablePositionCard) => (this.tablePositionCard = tablePositionCard)
      );
    this.subscription.add(tablePositionCardSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
