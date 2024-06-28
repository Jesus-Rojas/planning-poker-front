import { Component, OnInit } from '@angular/core';
import { PokerCard, RoleEnum, TablePosition, TablePositionCard } from '@shared/types';
import { generateManyPokerCard, getId, isEven } from '@shared/utils';

@Component({
  selector: 'app-poker-table',
  templateUrl: './poker-table.component.html',
  styleUrl: './poker-table.component.scss'
})
export class PokerTableComponent implements OnInit {
  tablePositionCard: TablePositionCard = {
    [TablePosition.TOP]: [],
    [TablePosition.BOTTOM]: [],
    [TablePosition.LEFT]: [],
    [TablePosition.RIGHT]: [],
  };
  users: PokerCard[] = [];
  meUser: PokerCard = { id: getId(), name: 'Jesus', role: RoleEnum.Player };

  TablePosition = TablePosition;

  updatePositionCard() {
    let unshiftOrPush: 'unshift' | 'push' = 'push';
    const usersFiltered = this.users.filter((user) => user.id !== this.meUser.id);

    const tablePositionCard: TablePositionCard = {
      [TablePosition.TOP]: [],
      [TablePosition.BOTTOM]: [],
      [TablePosition.LEFT]: [],
      [TablePosition.RIGHT]: [],
    };

    const fillPositionCard = (user: PokerCard, position: TablePosition, isEvenIndex: boolean) => {
      tablePositionCard[position][unshiftOrPush](user);
      if (isEvenIndex) unshiftOrPush = unshiftOrPush === 'unshift' ? 'push' : 'unshift';
    }

    const usersTopBottom = [this.meUser, ...usersFiltered.slice(0, 9)];
    usersTopBottom.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.TOP : TablePosition.BOTTOM;
      fillPositionCard(user, position, isEvenIndex);
    });

    const usersLeftRight = usersFiltered.slice(9);
    usersLeftRight.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.LEFT : TablePosition.RIGHT;
      fillPositionCard(user, position, isEvenIndex);
    });

    this.tablePositionCard = tablePositionCard;
  }

  ngOnInit(): void {
    this.users = [this.meUser];
    this.users = generateManyPokerCard(13);
    this.updatePositionCard();
  }
}
