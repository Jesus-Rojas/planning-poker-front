import { TestBed } from '@angular/core/testing';
import { HeaderService } from './header.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default header status', (done) => {
    service.headerStatus$.subscribe(status => {
      expect(status).toBe(HeaderStatusEnum.CreateGame);
      done();
    });
  });

  it('should have default table name', (done) => {
    service.tableName$.subscribe(name => {
      expect(name).toBe('');
      done();
    });
  });

  it('should update table name', (done) => {
    const newTableName = 'New Table Name';
    service.updateTableName(newTableName);
    service.tableName$.subscribe(name => {
      expect(name).toBe(newTableName);
      done();
    });
  });

  it('should update header status', (done) => {
    const newStatus = HeaderStatusEnum.InsideTheGame;
    service.updateHeaderStatus(newStatus);
    service.headerStatus$.subscribe(status => {
      expect(status).toBe(newStatus);
      done();
    });
  });
});
