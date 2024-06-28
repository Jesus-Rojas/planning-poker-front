import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poker-card',
  templateUrl: './poker-card.component.html',
  styleUrl: './poker-card.component.scss'
})
export class PokerCardComponent {
  @Input() text = 'Jesus';
}
