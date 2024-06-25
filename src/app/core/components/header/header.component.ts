import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderStatusEnum } from '../../types/header-status.enum';
import {
  ButtonFieldColorEnum,
  ButtonFieldVariantEnum,
} from '@design-system/atoms/components/button-field/types';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/components/avatar-field/types';
import { HeaderService } from '@core/services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private headerService: HeaderService,
  ) { }

  private subscription: Subscription = new Subscription();

  headerStatus: HeaderStatusEnum = HeaderStatusEnum.CreateGame;
  avatarFieldVariant: AvatarFieldVariantEnum = AvatarFieldVariantEnum.TextPurpleLigth;
  avatarFieldSize: AvatarFieldSizeEnum = AvatarFieldSizeEnum.ExtraLarge;

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
