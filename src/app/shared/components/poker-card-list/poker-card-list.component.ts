import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum, GameStatusEnum, PokerCard, RoleEnum } from '@shared/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poker-card-list',
  templateUrl: './poker-card-list.component.html',
  styleUrl: './poker-card-list.component.scss'
})
export class PokerCardListComponent implements OnInit, OnDestroy {
  @Input() pokerCards: PokerCard[] = [];

  private subscription = new Subscription();

  DisplayModeEnum = DisplayModeEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;
  GameStatusEnum = GameStatusEnum;

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedPokerCard: PokerCard | null = null;
  canConvertToAdmin = false;
  gameStatus: GameStatusEnum = GameStatusEnum.Reveal;

  constructor(
    private pokerTableService: PokerTableService,
  ) {}

  onRightClick(event: MouseEvent, pokerCard: PokerCard): void {
    event.preventDefault();
    if (!this.canConvertToAdmin) return;
    if (pokerCard.role === RoleEnum.Admin) return;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenuVisible = true;
    this.selectedPokerCard = pokerCard;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.contextMenuVisible = false;
  }

  convertToAdmin(): void {
    this.contextMenuVisible = false;
    const userUuid = this.selectedPokerCard?.id ?? '';
    this.pokerTableService.convertToAdmin(userUuid);
  }

  ngOnInit(): void {
    const meUserSubscription = this.pokerTableService.meUser$.subscribe((meUser) => {
      if (meUser?.role === RoleEnum.Admin) {
        this.canConvertToAdmin = true;
        return;
      }
      this.canConvertToAdmin = false;
    });
    this.subscription.add(meUserSubscription);

    const gameStatusSubscription = this.pokerTableService.gameStatus$.subscribe((gameStatus) => (this.gameStatus = gameStatus));
    this.subscription.add(gameStatusSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
