import { TestBed } from '@angular/core/testing';

import { PokerTableService } from './poker-table.service';

describe('PokerTableService', () => {
  let service: PokerTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokerTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
