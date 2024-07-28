import { Component, Input } from '@angular/core';
import { PokerCard } from '@shared/types';

@Component({
  selector: 'app-poker-card-list',
  templateUrl: './poker-card-list.component.html',
  styleUrl: './poker-card-list.component.scss'
})
export class PokerCardListComponent {
  @Input() pokerCards: PokerCard[] = [];
}
