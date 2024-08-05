import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { JoinGameComponent } from './join-game.component';
import { HeaderService } from '@core/services/header.service';
import { LoaderService } from '@core/services/loader.service';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { DisplayModeEnum, RoutePathEnum } from '@shared/types';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { DesignSystemModule } from '@design-system/design-system.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';

describe('JoinGameComponent', () => {
  let component: JoinGameComponent;
  let fixture: ComponentFixture<JoinGameComponent>;
  let loaderService: LoaderService;
  let gameService: GameService;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DesignSystemModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
        SharedModule,
      ],
      declarations: [JoinGameComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of({ get: () => 'test-uuid' }) } },
        { provide: LocalStorageService, useValue: { updateUser: jest.fn(), updateGame: jest.fn(), removeGame: jest.fn() } },
        { provide: HeaderService, useValue: { updateHeaderStatus: jest.fn() } },
        { provide: LoaderService, useValue: { showLoader: jest.fn(), hideLoader: jest.fn(), isLoading$: new Subject() } },
        { provide: GameService, useValue: { joinGame: jest.fn(), getGame: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: PokerTableService, useValue: { updateUsers: jest.fn(), updateMeUser: jest.fn(), organizeTablePositionCard: jest.fn() } },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    gameService = TestBed.inject(GameService);
    localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate player name correctly', () => {
    component.playerName = 'ValidName';
    expect(component.isValidPlayerName).toBe(true);
    component.playerName = '';
    expect(component.isValidPlayerName).toBe(false);
  });

  it('should handle continue correctly', () => {
    component.playerName = 'ValidName';
    component.currentDisplayMode = DisplayModeEnum.Player;
    component.gameUuid = 'test-uuid';

    const joinGameSpy = jest.spyOn(gameService, 'joinGame').mockReturnValue(of({ userUuid: 'user-uuid' }));
    const navigateSpy = jest.spyOn(router, 'navigate');
    const showLoaderSpy = jest.spyOn(loaderService, 'showLoader');
    const hideLoaderSpy = jest.spyOn(loaderService, 'hideLoader');

    component.handleContinue();

    expect(showLoaderSpy).toHaveBeenCalled();
    expect(joinGameSpy).toHaveBeenCalledWith('test-uuid', 'ValidName', DisplayModeEnum.Player);
    expect(navigateSpy).toHaveBeenCalledWith([RoutePathEnum.PlayingGame, 'test-uuid']);
    expect(hideLoaderSpy).toHaveBeenCalled();
  });

  it('should initialize correctly', () => {
    const updateHeaderStatusSpy = jest.spyOn(TestBed.inject(HeaderService), 'updateHeaderStatus');
    const updateUsersSpy = jest.spyOn(TestBed.inject(PokerTableService), 'updateUsers');
    const updateMeUserSpy = jest.spyOn(TestBed.inject(PokerTableService), 'updateMeUser');
    const organizeTablePositionCardSpy = jest.spyOn(TestBed.inject(PokerTableService), 'organizeTablePositionCard');
    const removeGameSpy = jest.spyOn(localStorageService, 'removeGame');
    const updateGameSpy = jest.spyOn(localStorageService, 'updateGame');

    component.ngOnInit();

    expect(updateHeaderStatusSpy).toHaveBeenCalledWith(HeaderStatusEnum.CreatePlayerOrViewGame);
    expect(updateUsersSpy).toHaveBeenCalledWith([]);
    expect(updateMeUserSpy).toHaveBeenCalled();
    expect(organizeTablePositionCardSpy).toHaveBeenCalled();
    expect(removeGameSpy).toHaveBeenCalled();
    expect(updateGameSpy).toHaveBeenCalledWith('test-uuid');
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
