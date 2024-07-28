import { Injectable } from '@angular/core';
import { PokerCard, TablePosition, TablePositionCard } from '@shared/types';
import { generateManyPokerCard, generateOnePokerCard, isEven } from '@shared/utils';
import { BehaviorSubject } from 'rxjs';

const meUser = generateOnePokerCard();

@Injectable({
  providedIn: 'root'
})
export class PokerTableService {
  private tablePositionCardSubject = new BehaviorSubject<TablePositionCard>({
    [TablePosition.Top]: [],
    [TablePosition.Bottom]: [],
    [TablePosition.Left]: [],
    [TablePosition.Right]: [],
  });
  private usersSubject = new BehaviorSubject<PokerCard[]>([
    ...generateManyPokerCard(3),
    meUser,
  ]);
  private meUserSubject = new BehaviorSubject<PokerCard | undefined>(meUser);
  private someUserHasSelectedOnePokerCardSubject = new BehaviorSubject<boolean>(false);
  private maxTopBottomUsers = 10;

  tablePositionCard$ = this.tablePositionCardSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  meUser$ = this.meUserSubject.asObservable();
  someUserHasSelectedOnePokerCard$ = this.someUserHasSelectedOnePokerCardSubject.asObservable();

  updateUsers(users: PokerCard[]) {
    this.usersSubject.next(users);
  }

  updateMeUser(meUser?: PokerCard) {
    if (meUser) {
      const users = this.usersSubject.value;
      const usersFiltered = users.filter((user) => user.id !== meUser.id);
      this.updateUsers([meUser, ...usersFiltered]);
    }
    this.meUserSubject.next(meUser);
  }

  updateTablePositionCard(tablePositionCard: TablePositionCard) {
    this.tablePositionCardSubject.next(tablePositionCard);
  }

  organizeTablePositionCard() {
    let unshiftOrPush: 'unshift' | 'push' = 'push';
    const meUser = this.meUserSubject.value;
    const users = this.usersSubject.value;
    const usersFiltered = meUser ? users.filter((user) => user.id !== meUser.id) : users;
    const limitUsers = this.maxTopBottomUsers - 1;
    const tablePositionCard: TablePositionCard = {
      [TablePosition.Top]: [],
      [TablePosition.Bottom]: [],
      [TablePosition.Left]: [],
      [TablePosition.Right]: [],
    };

    const usersTopBottom = [...usersFiltered.slice(0, limitUsers)];
    if (meUser) usersTopBottom.unshift(meUser);
    usersTopBottom.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.Top : TablePosition.Bottom;
      tablePositionCard[position][unshiftOrPush](user);
      if (isEvenIndex) unshiftOrPush = unshiftOrPush === 'unshift' ? 'push' : 'unshift';
    });

    const amountBottom = tablePositionCard[TablePosition.Bottom].length;
    if (isEven(amountBottom) && amountBottom > 0) {
      tablePositionCard[TablePosition.Bottom].push(generateOnePokerCard({ isVisible: false }));
    }

    const usersLeftRight = usersFiltered.slice(limitUsers);
    usersLeftRight.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.Left : TablePosition.Right;
      tablePositionCard[position].push(user);
    });

    this.updateTablePositionCard(tablePositionCard);
    this.someUserHasSelectedOnePokerCardSubject.next(users.some((user) => user.isSelected));
  }
}
