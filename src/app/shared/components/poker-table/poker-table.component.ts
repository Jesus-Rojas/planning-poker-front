import { Component, OnDestroy } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { GameStatusEnum, RoleEnum, TablePositionEnum } from '@shared/types';
import { combineLatest, delay, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent implements OnDestroy {
  private subscription = new Subscription();
  combinedObservable$ = combineLatest([
    this.pokerTableService.someUserHasSelectedOnePokerCard$,
    this.pokerTableService.meUser$,
    this.pokerTableService.gameStatus$
  ]).pipe(
    map(([someUserHasSelectedCard, meUser, gameStatus]) => ({
      someUserHasSelectedCard,
      meUser,
      gameStatus,
    }))
  );

  constructor (
    public pokerTableService: PokerTableService,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
  ) { }

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
      .pipe(
        delay(2000),
      )
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
