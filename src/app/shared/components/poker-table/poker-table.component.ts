import { Component, OnInit } from '@angular/core';
import { PokerTableService } from '@shared/services/poker-table.service';
import { TablePosition } from '@shared/types';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent {
  constructor (
    public pokerTableService: PokerTableService,
  ) { }

  TablePosition = TablePosition;
}
