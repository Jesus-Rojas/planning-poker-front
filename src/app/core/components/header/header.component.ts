import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStatusEnum } from '../../types/header-status.enum';
import {
  ButtonFieldColorEnum,
  ButtonFieldVariantEnum,
} from '@design-system/atoms/button-field/types';
import {
  AvatarFieldSizeEnum,
  AvatarFieldVariantEnum,
} from '@design-system/atoms/avatar-field/types';
import { HeaderService } from '@core/services/header.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services/loader.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum, PokerCard } from '@shared/types';

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
  ) {}

  private subscription: Subscription = new Subscription();

  classTextLogo = '';
  classSectionTitle = '';
  classSectionPlayer = '';
  classContainer = '';

  headerStatus: HeaderStatusEnum = HeaderStatusEnum.CreateGame;
  avatarFieldVariant: AvatarFieldVariantEnum =
    AvatarFieldVariantEnum.TextPurpleLigth;
  avatarFieldSize: AvatarFieldSizeEnum = AvatarFieldSizeEnum.Large;
  showInvitePlayers = false;
  displayModes = Object.values(DisplayModeEnum);
  meUser: PokerCard | undefined = undefined;
  isLoading = false;

  ButtonFieldColorEnum = ButtonFieldColorEnum;
  ButtonFieldVariantEnum = ButtonFieldVariantEnum;
  HeaderStatusEnum = HeaderStatusEnum;
  AvatarFieldVariantEnum = AvatarFieldVariantEnum;
  AvatarFieldSizeEnum = AvatarFieldSizeEnum;

  updateClassContainer() {
    const classesList = ['container'];
    if (this.isLoading) classesList.push('hidden');
    this.classContainer = classesList.join(' ');
  }

  updateClassSectionPlayer() {
    const classesList = ['section-player'];
    if (this.headerStatus === HeaderStatusEnum.CreateGame)
      classesList.push('hidden');
    this.classSectionPlayer = classesList.join(' ');
  }

  updateClassSectionTitle() {
    const classesList = ['section-title'];
    if (
      [
        HeaderStatusEnum.CreatePlayerOrViewGame,
        HeaderStatusEnum.CreateGame,
      ].includes(this.headerStatus)
    )
      classesList.push('hidden');
    this.classSectionTitle = classesList.join(' ');
  }

  updateClassTextLogo() {
    const classesList = ['text-logo'];
    if (
      [
        HeaderStatusEnum.CreatePlayerOrViewGame,
        HeaderStatusEnum.InsideTheGame,
      ].includes(this.headerStatus)
    )
      classesList.push('hidden');
    this.classTextLogo = classesList.join(' ');
  }

  ngOnInit(): void {
    this.updateClassTextLogo();
    this.updateClassSectionTitle();
    this.updateClassSectionPlayer();
    this.updateClassContainer();

    const headerStatusSubscription = this.headerService.headerStatus$.subscribe(
      (headerStatus) => {
        this.headerStatus = headerStatus;
        this.updateClassTextLogo();
        this.updateClassSectionTitle();
        this.updateClassSectionPlayer();
      }
    );
    this.subscription.add(headerStatusSubscription);

    const meUserSubscription = this.pokerTableService.meUser$.subscribe(
      (meUser) => (this.meUser = meUser)
    );
    this.subscription.add(meUserSubscription);

    const isLoadingSubscription = this.loaderService.isLoading$.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
        this.updateClassContainer();
      }
    );
    this.subscription.add(isLoadingSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
