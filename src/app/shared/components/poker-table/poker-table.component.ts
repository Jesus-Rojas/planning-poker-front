import { Component } from '@angular/core';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent {
  pokerCards = {
    top: new Array(5).fill(null).map((_, index) => ({ value: index + 1 })),
    bottom: new Array(5).fill(null).map((_, index) => ({ value: index + 1 })),
    left: new Array(15).fill(null).map((_, index) => ({ value: index + 1 })),
    right: new Array(15).fill(null).map((_, index) => ({ value: index + 1 })),
  }
}
