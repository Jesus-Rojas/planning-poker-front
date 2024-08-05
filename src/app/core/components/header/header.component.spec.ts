import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HeaderService } from '@core/services/header.service';
import { LoaderService } from '@core/services/loader.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { of } from 'rxjs';
import { AvatarFieldSizeEnum, AvatarFieldVariantEnum } from '@design-system/atoms/avatar-field/types';
import { DisplayModeEnum } from '@shared/types';
import { DesignSystemModule } from '@design-system/design-system.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const headerServiceMock = {
      headerStatus$: of(HeaderStatusEnum.CreateGame)
    };

    const loaderServiceMock = {};
    const pokerTableServiceMock = {};

    await TestBed.configureTestingModule({
      imports: [
        DesignSystemModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
        SharedModule,
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: HeaderService, useValue: headerServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: PokerTableService, useValue: pokerTableServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.headerStatus).toBe(HeaderStatusEnum.CreateGame);
    expect(component.avatarFieldVariant).toBe(AvatarFieldVariantEnum.TextPurpleLigth);
    expect(component.avatarFieldSize).toBe(AvatarFieldSizeEnum.Large);
    expect(component.showInvitePlayers).toBe(false);
    expect(component.displayModes).toEqual(Object.values(DisplayModeEnum));
  });

  it('should subscribe to headerStatus on init', () => {
    const headerService = TestBed.inject(HeaderService);
    jest.spyOn(headerService.headerStatus$, 'subscribe');
    component.ngOnInit();
    expect(headerService.headerStatus$.subscribe).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const subscriptionSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
  });
});
