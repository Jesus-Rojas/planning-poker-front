import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '@core/services/header.service';
import { LoaderService } from '@core/services/loader.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { RoleEnum, RoutePathEnum, TablePosition, TablePositionCard } from '@shared/types';
import { isValidName } from '@shared/utils';
import { Subscription } from 'rxjs';

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
    private loaderService: LoaderService,
    private gameService: GameService,
    private router: Router,
    private pokerTableService: PokerTableService,
  ) { }

  private subscription = new Subscription();
  gameUuid: string | null = null;
  playerName = '';
  currentRole = '';
  isLoading = false;

  RoleEnum = RoleEnum;
  ButtonFieldColorEnum = ButtonFieldColorEnum;

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
    if (!this.isValidPlayerName || !this.currentRole) return;
    this.loaderService.showLoader();
    const joinGameSubscription = this.gameService
      .joinGame(this.gameUuid!, this.playerName)
      .subscribe({
        next: ({ userUuid }) => {
          this.localStorageService.updateUser(userUuid);
          console.log({ userUuid });
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
      .subscribe((params) => {
        const gameUuid = params.get('gameUuid') ?? '';
        this.gameUuid = gameUuid;
        this.localStorageService.updateGame(gameUuid);
      });
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
