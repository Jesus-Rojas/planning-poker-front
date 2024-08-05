import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PokerTableService } from './poker-table.service';
import { LocalStorageService } from './local-storage.service';
import { GameService } from './game.service';
import {
  PokerCard,
  TablePositionEnum,
  TablePositionCard,
  GameStatusEnum,
  ScoreCard,
  DisplayModeEnum,
  RoleEnum,
} from '@shared/types';
import { generateManyPokerCard, generateOnePokerCard } from '@shared/utils';

jest.mock('./game.service');
jest.mock('./local-storage.service');

describe('PokerTableService', () => {
  let service: PokerTableService;
  let localStorageService: jest.Mocked<LocalStorageService>;
  let gameService: jest.Mocked<GameService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokerTableService,
        {
          provide: LocalStorageService,
          useValue: { getUser: jest.fn(), getGame: jest.fn() },
        },
        {
          provide: GameService,
          useValue: {
            resetGame: jest.fn(() => of(null)),
            updateDisplayMode: jest.fn(() => of(null)),
            convertToAdmin: jest.fn(() => of(null)),
          },
        },
      ],
    });

    service = TestBed.inject(PokerTableService);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jest.Mocked<LocalStorageService>;
    gameService = TestBed.inject(GameService) as jest.Mocked<GameService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update score cards', () => {
    const scoreCards: ScoreCard[] = [];
    service.updateScoreCards(scoreCards);
    service.scoreCards$.subscribe(value => {
      expect(value).toEqual(scoreCards);
    });
  });

  it('should update average', () => {
    const average = 5;
    service.updateAverage(average);
    service.average$.subscribe(value => {
      expect(value).toBe(average);
    });
  });

  it('should update game status', () => {
    const gameStatus = GameStatusEnum.Loading;
    service.updateGameStatus(gameStatus);
    service.gameStatus$.subscribe(value => {
      expect(value).toBe(gameStatus);
    });
  });

  it('should update users', () => {
    const users: PokerCard[] = [];
    service.updateUsers(users);
    service.users$.subscribe(value => {
      expect(value).toEqual(users);
    });
  });

  it('should update me user', () => {
    const meUser: PokerCard = generateOnePokerCard();
    service.updateMeUser(meUser);
    service.meUser$.subscribe(value => {
      expect(value).toEqual(meUser);
    });
    service.users$.subscribe((users) => {
      const user = users.find((user) => user.id === meUser.id);
      expect(user).toEqual(meUser);
    });
  });

  it('should update table position card', () => {
    const tablePositionCard: TablePositionCard = {
      [TablePositionEnum.Top]: [],
      [TablePositionEnum.Bottom]: [],
      [TablePositionEnum.Left]: [],
      [TablePositionEnum.Right]: [],
    };
    service.updateTablePositionCard(tablePositionCard);
    service.tablePositionCard$.subscribe(value => {
      expect(value).toEqual(tablePositionCard);
    });
  });

  describe('organizeTablePositionCard', () => {
    it('should add a hidden card if bottom cards are even', () => {
      const meUser: PokerCard = generateOnePokerCard();
      const users: PokerCard[] = [
        meUser,
        ...generateManyPokerCard(2),
      ];
      service.updateMeUser(meUser);
      service.updateUsers(users);
      service.organizeTablePositionCard();

      service.tablePositionCard$.subscribe(value => {
        const bottomCards = value[TablePositionEnum.Bottom];
        expect(bottomCards.length % 2).toBe(1);
      });

      service.someUserHasSelectedOnePokerCard$.subscribe(value => {
        expect(value).toBe(true);
      });
    });

    it('should assign users to left and right positions correctly', () => {
      const users: PokerCard[] = generateManyPokerCard(20);
      service.updateUsers(users);
      service.organizeTablePositionCard();

      service.tablePositionCard$.subscribe((tablePositionCard) => {
        const leftUsers = tablePositionCard[TablePositionEnum.Left];
        const rightUsers = tablePositionCard[TablePositionEnum.Right];
        expect(leftUsers.length).toBe(5);
        expect(rightUsers.length).toBe(5);
      });
    });
  });

  describe('resetGame', () => {
    it('should reset game', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      localStorageService.getUser.mockReturnValue('user1');
      localStorageService.getGame.mockReturnValue('game1');
      service.updateUsers(users);
      service.resetGame();
      service.users$.subscribe((users) => {
        const [user] = users;
        expect(user.cardSelected).toBeUndefined();
        expect(user.isSelected).toBe(false);
      });
      expect(gameService.resetGame).toHaveBeenCalledWith('game1');
    });

    it('should reset game without user', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      localStorageService.getUser.mockReturnValue(null);
      localStorageService.getGame.mockReturnValue('game1');
      service.updateUsers(users);
      service.resetGame();
      service.users$.subscribe((users) => {
        const [user] = users;
        expect(user.cardSelected).toBeUndefined();
        expect(user.isSelected).toBe(false);
      });
      expect(gameService.resetGame).toHaveBeenCalledWith('game1');
    });

    it('should reset game without game', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      localStorageService.getUser.mockReturnValue('user1');
      localStorageService.getGame.mockReturnValue(null);
      service.updateUsers(users);
      service.resetGame();
      service.users$.subscribe((users) => {
        const [user] = users;
        expect(user.cardSelected).toBeUndefined();
        expect(user.isSelected).toBe(false);
      });
    });

  });

  describe('updateDisplayMode', () => {
    it('should toggle display mode to Spectator', () => {
      const meUser: PokerCard = generateOnePokerCard({ displayMode: DisplayModeEnum.Player });
      localStorageService.getGame.mockReturnValue('game1');
      service.updateMeUser(meUser);
      service.toggleDisplayMode();
      service.meUser$.subscribe((user) => {
        expect(user?.displayMode).toBe(DisplayModeEnum.Spectator);
      });
      expect(gameService.updateDisplayMode).toHaveBeenCalledWith('game1', meUser.id);
    });

    it('should toggle display mode to Player', () => {
      const meUser: PokerCard = generateOnePokerCard({ displayMode: DisplayModeEnum.Spectator });
      localStorageService.getGame.mockReturnValue('game1');

      service.updateMeUser(meUser);
      service.toggleDisplayMode();
      service.meUser$.subscribe((user) => {
        expect(user?.displayMode).toBe(DisplayModeEnum.Player);
      });
      expect(gameService.updateDisplayMode).toHaveBeenCalledWith('game1', meUser.id);
    });

    it('should not toggle display mode without meUser', () => {
      localStorageService.getGame.mockReturnValue('game1');
      service.toggleDisplayMode();
      expect(gameService.updateDisplayMode).not.toHaveBeenCalled();
    });

    it('should not toggle display mode without game', () => {
      const meUser: PokerCard = generateOnePokerCard({ displayMode: DisplayModeEnum.Player });
      localStorageService.getGame.mockReturnValue(null);
      service.updateMeUser(meUser);
      service.toggleDisplayMode();
      expect(gameService.updateDisplayMode).toHaveBeenCalledWith('', meUser.id);
    });
  });

  describe('convertToAdmin', () => {
    it('should convert user to admin', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      localStorageService.getGame.mockReturnValue('game1');
      service.updateUsers(users);
      service.convertToAdmin('user1');
      expect(gameService.convertToAdmin).toHaveBeenCalledWith('game1', 'user1');
    });

    it('should not convert user to admin without user', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      localStorageService.getGame.mockReturnValue('game1');
      service.updateUsers(users);
      service.convertToAdmin('');
      expect(gameService.convertToAdmin).toHaveBeenCalledWith('game1', '');
    });

    it('should not convert user to admin without game', () => {
      const users: PokerCard[] = [generateOnePokerCard()];
      const [user] = users;
      localStorageService.getGame.mockReturnValue(null);
      service.updateUsers(users);
      service.convertToAdmin(user.id);
      service.users$.subscribe((users) => {
        const [user] = users;
        expect(user.role).toBe(RoleEnum.Admin);
      });
    });
  });
});
