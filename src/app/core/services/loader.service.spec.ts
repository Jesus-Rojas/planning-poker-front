import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default isLoading value as false', (done) => {
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should show loader', (done) => {
    service.showLoader();
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should hide loader', (done) => {
    service.showLoader(); // First, show the loader
    service.hideLoader();
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(false);
      done();
    });
  });
});
