import { Injectable } from '@angular/core';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerStatusSubject = new BehaviorSubject<HeaderStatusEnum>(HeaderStatusEnum.CreateGame);
  headerStatus$ = this.headerStatusSubject.asObservable();

  updateHeaderStatus(headerStatus: HeaderStatusEnum) {
    this.headerStatusSubject.next(headerStatus);
  }
}
