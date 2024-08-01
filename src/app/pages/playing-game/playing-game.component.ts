import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@core/services/header.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum, GameStatusEnum, Player, RoleEnum } from '@shared/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playing-game',
  templateUrl: './playing-game.component.html',
  styleUrl: './playing-game.component.scss'
})
export class PlayingGameComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  DisplayModeEnum = DisplayModeEnum;
  GameStatusEnum = GameStatusEnum;

  constructor(
    private headerService: HeaderService,
    public pokerTableService: PokerTableService,
    private gameService: GameService,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderStatus(HeaderStatusEnum.InsideTheGame);
    const gameUuid = this.localStorageService.getGame() ?? '';
    const getGameSubscription = this.gameService
      .getGame(gameUuid)
      .subscribe(({ name, users, status }) => {
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
      });

    this.subscription.add(getGameSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
