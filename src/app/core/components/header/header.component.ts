import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStatusEnum } from '../../types/header-status.enum';
import {
  ButtonFieldColorEnum,
  ButtonFieldVariantEnum,
} from '@design-system/atoms/button-field/types';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { HeaderService } from '@core/services/header.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services/loader.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum } from '@shared/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public headerService: HeaderService,
    public loaderService: LoaderService,
    public pokerTableService: PokerTableService
  ) { }

  private subscription: Subscription = new Subscription();

  headerStatus: HeaderStatusEnum = HeaderStatusEnum.CreateGame;
  avatarFieldVariant: AvatarFieldVariantEnum = AvatarFieldVariantEnum.TextPurpleLigth;
  avatarFieldSize: AvatarFieldSizeEnum = AvatarFieldSizeEnum.Large;
  showInvitePlayers = false;
  displayModes = Object.values(DisplayModeEnum);

  ButtonFieldColorEnum = ButtonFieldColorEnum;
  ButtonFieldVariantEnum = ButtonFieldVariantEnum;
  HeaderStatusEnum = HeaderStatusEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;

  ngOnInit(): void {
    const headerStatusSubscription = this.headerService
      .headerStatus$
      .subscribe((headerStatus) => (this.headerStatus = headerStatus));

    this.subscription.add(headerStatusSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
