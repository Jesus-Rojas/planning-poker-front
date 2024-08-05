import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CreateGameComponent } from './create-game.component';
import { LoaderService } from '@core/services/loader.service';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { ToastService } from '@shared/services/toast.service';
import { of, throwError } from 'rxjs';
import { DesignSystemModule } from '@design-system/design-system.module';
import { getFeatherIcons } from '@shared/utils';
import { FeatherModule } from 'angular-feather';

describe('CreateGameComponent', () => {
  let component: CreateGameComponent;
  let fixture: ComponentFixture<CreateGameComponent>;
  let loaderService: LoaderService;
  let gameService: GameService;
  let router: Router;
  let localStorageService: LocalStorageService;
  let toastService: ToastService;

  beforeEach(async () => {
    const loaderServiceMock = {
      showLoader: jest.fn(),
      hideLoader: jest.fn(),
      isLoading$: of(false),
    };

    const gameServiceMock = {
      createGame: jest.fn().mockReturnValue(of({ gameUuid: 'test-game-uuid' })),
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    const localStorageServiceMock = {
      getGame: jest.fn().mockReturnValue(null),
      getUser: jest.fn().mockReturnValue('test-user'),
      updateGame: jest.fn(),
      removeUser: jest.fn(),
    };

    const toastServiceMock = {
      showErrorToast: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        DesignSystemModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
      ],
      declarations: [CreateGameComponent],
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: GameService, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: LocalStorageService, useValue: localStorageServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader and create game', () => {
    component.gameName = 'validGameName';
    component.createGame();

    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(gameService.createGame).toHaveBeenCalledWith('validGameName');
  });

  it('should navigate to JoinGame on game creation success', () => {
    component.gameName = 'validGameName';
    component.createGame();

    expect(localStorageService.updateGame).toHaveBeenCalledWith('test-game-uuid');
    expect(router.navigate).toHaveBeenCalledWith(['join-game', 'test-game-uuid']);
  });

  it('should show error toast and hide loader on game creation error', () => {
    gameService.createGame = jest.fn().mockReturnValue(throwError(() => new Error('Error occurred')));


    component.gameName = 'validGameName';
    component.createGame();

    expect(toastService.showErrorToast).toHaveBeenCalledWith('Error', 'An error occurred while creating the game.');
    expect(loaderService.hideLoader).toHaveBeenCalled();
  });

  it('should validate game name', () => {
    component.gameName = 'validGameName';
    expect(component.isValidGameName).toBe(true);

    component.gameName = '';
    expect(component.isValidGameName).toBe(false);

    component.gameName = 'invalid@GameName';
    expect(component.isValidGameName).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
