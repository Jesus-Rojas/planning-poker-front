import { Component } from '@angular/core';
import { PokerTableService } from '@shared/services/poker-table.service';
import { PokerCardSizeEnum } from '@shared/types';

@Component({
  selector: 'app-poker-score',
  templateUrl: './poker-score.component.html',
  styleUrl: './poker-score.component.scss'
})
export class PokerScoreComponent {
  PokerCardSizeEnum = PokerCardSizeEnum;

  constructor(
    public pokerTableService: PokerTableService,
  ) { }
}
