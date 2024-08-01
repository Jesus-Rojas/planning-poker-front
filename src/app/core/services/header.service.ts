import { Injectable } from '@angular/core';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerStatusSubject = new BehaviorSubject<HeaderStatusEnum>(HeaderStatusEnum.CreateGame);
  private tableNameSubject = new BehaviorSubject('');

  headerStatus$ = this.headerStatusSubject.asObservable();
  tableName$ = this.tableNameSubject.asObservable();

  updateTableName(tableName: string) {
    this.tableNameSubject.next(tableName);
  }

  updateHeaderStatus(headerStatus: HeaderStatusEnum) {
    this.headerStatusSubject.next(headerStatus);
  }
}
