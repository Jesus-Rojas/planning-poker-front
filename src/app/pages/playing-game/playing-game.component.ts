import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@core/services/header.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum, GameStatusEnum, Player, PokerCard, RoleEnum } from '@shared/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playing-game',
  templateUrl: './playing-game.component.html',
  styleUrl: './playing-game.component.scss'
})
export class PlayingGameComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  meUser: PokerCard | undefined = undefined;
  gameStatus: GameStatusEnum = GameStatusEnum.Reveal;
  showCardSelector = false;
  stylesCardSelector: Partial<CSSStyleDeclaration> = {};

  DisplayModeEnum = DisplayModeEnum;
  GameStatusEnum = GameStatusEnum;

  constructor(
    private headerService: HeaderService,
    public pokerTableService: PokerTableService,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
  ) { }

  updateStylesCardSelector() {
    this.stylesCardSelector = {
      pointerEvents: (
        this.gameStatus === GameStatusEnum.Loading
          ? 'none'
          : 'auto'
      ),
    }
  }

  updateShowCardSelector() {
    this.showCardSelector = (
      this.meUser?.displayMode === DisplayModeEnum.Player &&
      [GameStatusEnum.Reveal, GameStatusEnum.Loading].includes(this.gameStatus)
    );
  }

  ngOnInit(): void {
    this.updateShowCardSelector();
    this.updateStylesCardSelector();
    this.headerService.updateHeaderStatus(HeaderStatusEnum.InsideTheGame);
    const gameUuid = this.localStorageService.getGame() ?? '';
    const getGameSubscription = this.gameService
      .getGame(gameUuid)
      .subscribe(({ name, users, status, average, scoreCards }) => {
        const convertToPokerCard = (user: Player) => ({
          id: user.uuid,
          name: user.name,
          displayMode: user.displayMode as DisplayModeEnum,
          role: user.role as RoleEnum,
          isVisible: true,
          isSelected: typeof user.cardSelected === 'string',
          cardSelected: user.cardSelected,
        });

        const userUuid = this.localStorageService.getUser();
        const meUser = users.find((user) => user.uuid === userUuid);

        this.pokerTableService.updateGameStatus(status);
        this.headerService.updateTableName(name);
        this.pokerTableService.updateUsers(
          users
            .filter((user) => user.isActive)
            .map((user) => convertToPokerCard(user))
        );
        if (meUser) this.pokerTableService.updateMeUser(convertToPokerCard(meUser));
        this.pokerTableService.organizeTablePositionCard();
        this.pokerTableService.updateAverage(average);
        this.pokerTableService.updateScoreCards(scoreCards);
      });

    this.subscription.add(getGameSubscription);

    const meUserSubscription = this.pokerTableService.meUser$.subscribe((meUser) => {
      this.meUser = meUser;
      this.updateShowCardSelector();
    });
    this.subscription.add(meUserSubscription);

    const gameStatusSubscription = this.pokerTableService.gameStatus$.subscribe((gameStatus) => {
      this.gameStatus = gameStatus;
      this.updateShowCardSelector();
      this.updateStylesCardSelector();
    });
    this.subscription.add(gameStatusSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
