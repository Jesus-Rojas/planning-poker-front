import { Injectable } from '@angular/core';
import { CardSelector } from '@shared/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardSelectorService {
  cardsSubject = new BehaviorSubject<CardSelector[]>([]);
  cards$ = this.cardsSubject.asObservable();

  updateCards(cards: CardSelector[]) {
    this.cardsSubject.next(cards);
  }
}
