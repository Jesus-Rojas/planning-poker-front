import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import { LoaderService } from '@core/services/loader.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { RoutePathEnum, DisplayModeEnum } from '@shared/types';
import { isValidName } from '@shared/utils';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrl: './join-game.component.scss'
})
export class JoinGameComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private headerService: HeaderService,
    public loaderService: LoaderService,
    private gameService: GameService,
    private router: Router,
    private pokerTableService: PokerTableService,
  ) { }

  private subscription = new Subscription();
  gameUuid: string | null = null;
  playerName = '';
  currentDisplayMode = '';
  isLoading = false;

  DisplayModeEnum = DisplayModeEnum;
  ButtonFieldColorEnum = ButtonFieldColorEnum;

  get isDisabledButtonField() {
    return !this.playerName || !this.currentDisplayMode || this.isLoading;
  }

  get validatePlayerName() {
    return isValidName(this.playerName);
  }

  get isValidPlayerName() {
    if (this.playerName === '') return false;
    return this.validatePlayerName;
  }

  get isInvalidPlayerName() {
    if (this.playerName === '') return false;
    return !this.validatePlayerName;
  }

  handleContinue() {
    if (!this.isValidPlayerName || !this.currentDisplayMode) return;
    this.loaderService.showLoader();
    const joinGameSubscription = this.gameService
      .joinGame(this.gameUuid!, this.playerName, this.currentDisplayMode as DisplayModeEnum)
      .subscribe({
        next: ({ userUuid }) => {
          this.localStorageService.updateUser(userUuid);
          this.router.navigate([RoutePathEnum.PlayingGame, this.gameUuid]);
        },
        error: () => (this.loaderService.hideLoader()),
        complete: () => (this.loaderService.hideLoader()),
      });

    this.subscription.add(joinGameSubscription);
  }

  ngOnInit() {
    this.headerService.updateHeaderStatus(HeaderStatusEnum.CreatePlayerOrViewGame);
    this.pokerTableService.updateUsers([]);
    this.pokerTableService.updateMeUser();
    this.pokerTableService.organizeTablePositionCard();
    this.localStorageService.removeGame();

    const paramMapSubscription = this.activatedRoute
      .paramMap
      .pipe(
        switchMap((params) => {
          const gameUuid = params.get('gameUuid') ?? '';
          this.gameUuid = gameUuid;
          this.localStorageService.updateGame(gameUuid);
          return this.gameService.getGame(gameUuid);
        }),
      )
      .subscribe();
    this.subscription.add(paramMapSubscription);

    const subscriptionIsLoading = this.loaderService
      .isLoading$
      .subscribe((isLoading) => (this.isLoading = isLoading));
    this.subscription.add(subscriptionIsLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
