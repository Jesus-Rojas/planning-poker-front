import { Component, OnDestroy } from '@angular/core';
import { ButtonFieldColorEnum } from '@design-system/atoms/components/button-field/types';
import { LoaderService } from '@core/services/loader.service';
import { isValidName } from '@shared/utils';
import { GameService } from '@shared/services/game.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { RoutePathEnum } from '../types/route-path.enum';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnDestroy {
  constructor(
    private loaderService: LoaderService,
    private gameService: GameService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  isLoading = false;
  subscriptions = new Subscription();
  gameName = '';
  ButtonFieldColorEnum = ButtonFieldColorEnum;

  createGame() {
    if (!this.isValidGameName) return;

    this.loaderService.showLoader();
    const subscriptionGameService = this.gameService
      .createGame(this.gameName)
      .subscribe({
        next: ({ gameUuid }) => {
          this.localStorageService.updateGame(gameUuid);
          this.router.navigate([RoutePathEnum.JoinGame, gameUuid]);
        },
        error: () => (this.loaderService.hideLoader()),
        complete: () => (this.loaderService.hideLoader()),
      }
    );

    this.subscriptions.add(subscriptionGameService);
  }

  get validateGameName() {
    return isValidName(this.gameName);
  }

  get isValidGameName() {
    if (this.gameName === '') return false;
    return this.validateGameName;
  }

  get isInvalidGameName() {
    if (this.gameName === '') return false;
    return !this.validateGameName;
  }

  ngOnInit() {
    const subscriptionIsLoading = this.loaderService
      .$isLoading
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.subscriptions.add(subscriptionIsLoading);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
