import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@core/services/header.service';
import { HeaderStatusEnum } from '@core/types/header-status.enum';
import { PokerTableService } from '@shared/services/poker-table.service';

@Component({
  selector: 'app-playing-game',
  templateUrl: './playing-game.component.html',
  styleUrl: './playing-game.component.scss'
})
export class PlayingGameComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private pokerTableService: PokerTableService,
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderStatus(HeaderStatusEnum.InsideTheGame);
    this.pokerTableService.organizeTablePositionCard();
  }
}
