import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import {
  DisplayModeEnum,
  Game,
  GameStatusEnum,
  RequestCreateGame,
  ResponseCreateGame,
  ResponseRevealCards,
  RoutePathEnum,
} from '@shared/types';
import { RequestJoinGame } from '@shared/types/request-join-game.interface';
import { ResponseJoinGame } from '@shared/types/response-join-game.interface';
import { ToastService } from './toast.service';
import { LocalStorageService } from './local-storage.service';
import { GameService } from './game.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;
  let router: Router;
  let localStorageService: LocalStorageService;

  const baseUrl = environment.API_URL + '/games';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        GameService,
        { provide: ToastService, useValue: { showErrorToast: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: LocalStorageService, useValue: { removeGame: jest.fn() } },
      ],
    }).compileComponents();

    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
    router = TestBed.inject(Router);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a game', () => {
    const requestBody: RequestCreateGame = { name: 'Test Game' };
    const responseBody: ResponseCreateGame = { gameUuid: 'test-uuid' };

    service.createGame('Test Game').subscribe((response) => {
      expect(response).toEqual(responseBody);
    });

    const req = httpMock.expectOne(`${baseUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestBody);
    req.flush(responseBody);
  });

  it('should join a game and handle error', () => {
    const gameUuid = 'test-uuid';
    const requestBody: RequestJoinGame = {
      name: 'Player',
      displayMode: DisplayModeEnum.Player,
    };
    const responseBody: ResponseJoinGame = { userUuid: 'user-uuid' };

    service
      .joinGame(gameUuid, 'Player', DisplayModeEnum.Player)
      .subscribe((response) => {
        expect(response).toEqual(responseBody);
      });

    const req = httpMock.expectOne(`${baseUrl}/join/${gameUuid}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestBody);
    req.flush(responseBody);

    const errorResponse = new HttpErrorResponse({
      error: { message: 'Game not found' },
      status: HttpStatusCode.NotFound,
    });

    service.joinGame(gameUuid, 'Player', DisplayModeEnum.Player).subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
        expect(toastService.showErrorToast).toHaveBeenCalledWith(
          'Game not found'
        );
        expect(localStorageService.removeGame).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([
          RoutePathEnum.CreateGame,
        ]);
      },
    });

    const errorReq = httpMock.expectOne(`${baseUrl}/join/${gameUuid}`);
    errorReq.flush(
      { message: 'Game not found' },
      { status: HttpStatusCode.NotFound, statusText: 'Not Found' }
    );
  });

  it('should get a game and handle error', () => {
    const gameUuid = 'test-uuid';
    const responseBody: Game = {
      name: 'Test Game',
      average: 5,
      scoreCards: [],
      users: [],
      status: GameStatusEnum.Reveal,
    };

    service.getGame(gameUuid).subscribe((response) => {
      expect(response).toEqual(responseBody);
    });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseBody);

    const errorResponse = new HttpErrorResponse({
      error: { message: 'Game not found' },
      status: HttpStatusCode.NotFound,
    });

    service.getGame(gameUuid).subscribe({
      error: (error) => {
        expect(error).toEqual(errorResponse);
        expect(toastService.showErrorToast).toHaveBeenCalledWith(
          'Game not found'
        );
        expect(localStorageService.removeGame).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([
          RoutePathEnum.CreateGame,
        ]);
      },
    });

    const errorReq = httpMock.expectOne(`${baseUrl}/${gameUuid}`);
    errorReq.flush(
      { message: 'Game not found' },
      { status: HttpStatusCode.NotFound, statusText: 'Not Found' }
    );
  });

  it('should get a user', () => {
    const gameUuid = 'test-uuid';
    const userUuid = 'user-uuid';
    const responseBody = {
      /* fill with user properties */
    };

    service.getUser(gameUuid, userUuid).subscribe((response) => {
      expect(response).toEqual(responseBody);
    });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}/users/${userUuid}`);
    expect(req.request.method).toBe('GET');
    req.flush(responseBody);
  });

  it('should update card selected for user', () => {
    const gameUuid = 'test-uuid';
    const userUuid = 'user-uuid';
    const cardSelected = 'card-id';

    service
      .updateMeCardSelected(gameUuid, userUuid, cardSelected)
      .subscribe((response) => {
        expect(response).toBeUndefined();
      });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}/users/${userUuid}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ cardSelected });
    req.flush(null);
  });

  it('should update game status', () => {
    const gameUuid = 'test-uuid';
    const status: GameStatusEnum = GameStatusEnum.Loading;

    service.updateStatus(gameUuid, status).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}/status`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ status });
    req.flush(null);
  });

  it('should reveal cards', () => {
    const gameUuid = 'test-uuid';
    const responseBody: ResponseRevealCards = {
      average: 5,
      scoreCards: [],
    };

    service.revealCards(gameUuid).subscribe((response) => {
      expect(response).toEqual(responseBody);
    });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}/reveal-cards`);
    expect(req.request.method).toBe('POST');
    req.flush(responseBody);
  });

  it('should reset game', () => {
    const gameUuid = 'test-uuid';
    const responseBody: ResponseRevealCards = {
      average: 5,
      scoreCards: [],
    };

    service.resetGame(gameUuid).subscribe((response) => {
      expect(response).toEqual(responseBody);
    });

    const req = httpMock.expectOne(`${baseUrl}/${gameUuid}/reset`);
    expect(req.request.method).toBe('POST');
    req.flush(responseBody);
  });

  it('should update display mode', () => {
    const gameUuid = 'test-uuid';
    const userUuid = 'user-uuid';

    service.updateDisplayMode(gameUuid, userUuid).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(
      `${baseUrl}/${gameUuid}/update-display-mode/${userUuid}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should convert user to admin', () => {
    const gameUuid = 'test-uuid';
    const userUuid = 'user-uuid';

    service.convertToAdmin(gameUuid, userUuid).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(
      `${baseUrl}/${gameUuid}/convert-to-admin/${userUuid}`
    );
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
