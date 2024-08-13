import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CardSelectorComponent } from './card-selector.component';
import { CardSelectorService } from '@shared/services/card-selector.service';
import { GameService } from '@shared/services/game.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PokerTableService } from '@shared/services/poker-table.service';
import { CardSelectorTypeEnum, PokerCard } from '@shared/types';
import { of, Subject } from 'rxjs';

describe('CardSelectorComponent', () => {
  let component: CardSelectorComponent;
  let fixture: ComponentFixture<CardSelectorComponent>;
  let cardSelectorService: CardSelectorService;
  let pokerTableService: PokerTableService;
  let gameService: GameService;
  let localStorageService: LocalStorageService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSelectorComponent],
      providers: [
        { provide: CardSelectorService, useValue: { updateCards: jest.fn(), cards$: new Subject() } },
        { provide: PokerTableService, useValue: { updateMeUser: jest.fn(), organizeTablePositionCard: jest.fn(), meUser$: new Subject() } },
        { provide: GameService, useValue: { updateMeCardSelected: jest.fn().mockReturnValue(of(null)) } },
        { provide: LocalStorageService, useValue: { getGame: jest.fn(), getUser: jest.fn() } }
      ]
    }).compileComponents();
    localStorageService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSelectorComponent);
    component = fixture.componentInstance;
    cardSelectorService = TestBed.inject(CardSelectorService);
    pokerTableService = TestBed.inject(PokerTableService);
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cards and subscriptions on init', fakeAsync(() => {
    const updateCardsSpy = jest.spyOn(cardSelectorService, 'updateCards');
    const mockCards = [
      { id: '1', type: CardSelectorTypeEnum.Text, value: '1', isSelected: false },
      { id: '2', type: CardSelectorTypeEnum.Text, value: '2', isSelected: false }
    ];
    cardSelectorService.cards$ = of(mockCards);

    component.ngOnInit();
    tick();  // Espera a que todas las operaciones asincrónicas terminen

    expect(updateCardsSpy).toHaveBeenCalled();
    expect(component.cards.length).toBeGreaterThan(0);
  }));

  it('should handle poker card selection correctly', () => {
    component.cards = [
      { id: '1', type: CardSelectorTypeEnum.Text, value: '1', isSelected: false },
      { id: '2', type: CardSelectorTypeEnum.Text, value: '2', isSelected: false }
    ];
    component.meUser = { cardSelected: '', isSelected: false } as PokerCard;

    const updateMeUserSpy = jest.spyOn(pokerTableService, 'updateMeUser');
    const organizeTablePositionCardSpy = jest.spyOn(pokerTableService, 'organizeTablePositionCard');
    jest.spyOn(localStorageService, 'getGame').mockReturnValue('game-uuid');
    jest.spyOn(localStorageService, 'getUser').mockReturnValue('user-uuid');
    const updateMeCardSelectedSpy = jest.spyOn(gameService, 'updateMeCardSelected').mockReturnValue(of(undefined));

    component.handlePokerCard('1');

    expect(updateMeCardSelectedSpy).toHaveBeenCalledWith('game-uuid', 'user-uuid', '1');
    expect(updateMeUserSpy).toHaveBeenCalledWith({ ...component.meUser, isSelected: true, cardSelected: '1' });
    expect(organizeTablePositionCardSpy).toHaveBeenCalled();
  });

  it('should generate card correctly', () => {
    const card = component.generateCard(CardSelectorTypeEnum.Text, '5');
    expect(card).toEqual({ id: '5', type: CardSelectorTypeEnum.Text, value: '5', isSelected: false });
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscriptions, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
