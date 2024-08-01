import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { GameStatusEnum, RoleEnum, TablePositionEnum } from '@shared/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

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

  updateByStatus(status: GameStatusEnum) {
    const gameUuid = this.localStorageService.getGame() ?? '';
    this.pokerTableService.updateGameStatus(status);
    const updateStatusSubscription = this.gameService.updateStatus(gameUuid, status).subscribe();
    this.subscription.add(updateStatusSubscription);
  }

  revealCards() {
    this.updateByStatus(GameStatusEnum.Loading);
    setTimeout(() => (this.updateByStatus(GameStatusEnum.Reset)), 3000);
  }

  resetGame() {
    this.updateByStatus(GameStatusEnum.Reveal);
    this.pokerTableService.resetGame();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
