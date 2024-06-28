import { Injectable } from '@angular/core';
import { PokerCard, TablePosition, TablePositionCard } from '@shared/types';
import { generateManyPokerCard, generateOnePokerCard, isEven } from '@shared/utils';
import { BehaviorSubject } from 'rxjs';

const meUser = generateOnePokerCard({ name: 'Jesus' });

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
  private usersSubject = new BehaviorSubject<PokerCard[]>([meUser, ...generateManyPokerCard(13)]);
  private meUserSubject = new BehaviorSubject<PokerCard>(meUser);

  tablePositionCard$ = this.tablePositionCardSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  meUser$ = this.meUserSubject.asObservable();

  updateUsers(users: PokerCard[]) {
    this.usersSubject.next(users);
  }

  updateMeUser(meUser: PokerCard) {
    this.meUserSubject.next(meUser);
  }

  updateTablePositionCard(tablePositionCard: TablePositionCard) {
    this.tablePositionCardSubject.next(tablePositionCard);
  }

  organizeTablePositionCard() {
    let unshiftOrPush: 'unshift' | 'push' = 'push';
    const usersFiltered = this.usersSubject.value.filter((user) => user.id !== this.meUserSubject.value.id);

    const tablePositionCard: TablePositionCard = {
      [TablePosition.Top]: [],
      [TablePosition.Bottom]: [],
      [TablePosition.Left]: [],
      [TablePosition.Right]: [],
    };

    const usersTopBottom = [this.meUserSubject.value, ...usersFiltered.slice(0, 9)];
    usersTopBottom.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.Top : TablePosition.Bottom;
      tablePositionCard[position][unshiftOrPush](user);

      if (isEvenIndex) {
        unshiftOrPush = unshiftOrPush === 'unshift' ? 'push' : 'unshift';
      }
    });

    const usersLeftRight = usersFiltered.slice(9);
    usersLeftRight.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePosition.Left : TablePosition.Right;
      tablePositionCard[position].push(user);
    });

    this.updateTablePositionCard(tablePositionCard);
  }
}
