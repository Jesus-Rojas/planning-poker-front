import { TestBed } from '@angular/core/testing';

import { CardSelectorService } from './card-selector.service';

describe('CardSelectorService', () => {
  let service: CardSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
