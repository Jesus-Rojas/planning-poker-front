import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkGameGuard } from './check-game.guard';

describe('checkGameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkGameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
