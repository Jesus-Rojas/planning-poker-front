import { TestBed } from '@angular/core/testing';

import { CardSelectorService } from './card-selector.service';
import { BehaviorSubject } from 'rxjs';
import { CardSelector, CardSelectorTypeEnum } from '@shared/types';
import { getId } from '@shared/utils';

describe('CardSelectorService', () => {
  let service: CardSelectorService;
  let mockCardsSubject: BehaviorSubject<CardSelector[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardSelectorService],
    });
    service = TestBed.inject(CardSelectorService);
    mockCardsSubject = new BehaviorSubject<CardSelector[]>([]);
    service.cardsSubject = mockCardsSubject;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateCards', () => {
    it('should update cardsSubject with new cards', () => {
      const testCards: CardSelector[] = [
        {
          id: getId(),
          isSelected: true,
          type: CardSelectorTypeEnum.Icon,
          value: '?',
        },
        {
          id: getId(),
          isSelected: true,
          type: CardSelectorTypeEnum.Text,
          value: '23',
        },
      ];
      service.updateCards(testCards);

      service.cards$.subscribe((cards) => {
        expect(cards).toEqual(testCards);
      });
      expect(mockCardsSubject.value).toEqual(testCards);
    });
  });
});
