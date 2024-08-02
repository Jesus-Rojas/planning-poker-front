import { Injectable } from '@angular/core';
import { PokerCard, TablePositionEnum, TablePositionCard, GameStatusEnum, ScoreCard } from '@shared/types';
import { generateOnePokerCard, isEven } from '@shared/utils';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PokerTableService {
  private tablePositionCardSubject = new BehaviorSubject<TablePositionCard>({
    [TablePositionEnum.Top]: [],
    [TablePositionEnum.Bottom]: [],
    [TablePositionEnum.Left]: [],
    [TablePositionEnum.Right]: [],
  });
  private usersSubject = new BehaviorSubject<PokerCard[]>([]);
  private meUserSubject = new BehaviorSubject<PokerCard | undefined>(undefined);
  private someUserHasSelectedOnePokerCardSubject = new BehaviorSubject(false);
  private gameStatusSubject = new BehaviorSubject<GameStatusEnum>(GameStatusEnum.Reveal);
  private averageSubject = new BehaviorSubject(0);
  private scoreCardsSubject = new BehaviorSubject<ScoreCard[]>([]);
  private maxTopBottomUsers = 10;

  tablePositionCard$ = this.tablePositionCardSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  meUser$ = this.meUserSubject.asObservable();
  gameStatus$ = this.gameStatusSubject.asObservable();
  average$ = this.averageSubject.asObservable();
  scoreCards$ = this.scoreCardsSubject.asObservable();
  someUserHasSelectedOnePokerCard$ = this.someUserHasSelectedOnePokerCardSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private gameService: GameService,
  ) { }

  updateScoreCards(scoreCards: ScoreCard[]) {
    this.scoreCardsSubject.next(scoreCards);
  }

  updateAverage(average: number) {
    this.averageSubject.next(average);
  }

  updateGameStatus(gameStatus: GameStatusEnum) {
    this.gameStatusSubject.next(gameStatus);
  }

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
      [TablePositionEnum.Top]: [],
      [TablePositionEnum.Bottom]: [],
      [TablePositionEnum.Left]: [],
      [TablePositionEnum.Right]: [],
    };

    const usersTopBottom = [...usersFiltered.slice(0, limitUsers)];
    if (meUser) usersTopBottom.unshift(meUser);
    usersTopBottom.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePositionEnum.Top : TablePositionEnum.Bottom;
      tablePositionCard[position][unshiftOrPush](user);
      if (isEvenIndex) unshiftOrPush = unshiftOrPush === 'unshift' ? 'push' : 'unshift';
    });

    const amountBottom = tablePositionCard[TablePositionEnum.Bottom].length;
    if (isEven(amountBottom) && amountBottom > 0) {
      tablePositionCard[TablePositionEnum.Bottom].push(generateOnePokerCard({ isVisible: false }));
    }

    const usersLeftRight = usersFiltered.slice(limitUsers);
    usersLeftRight.forEach((user, index) => {
      const isEvenIndex = isEven(index + 1);
      const position = isEvenIndex ? TablePositionEnum.Left : TablePositionEnum.Right;
      tablePositionCard[position].push(user);
    });

    this.updateTablePositionCard(tablePositionCard);
    this.someUserHasSelectedOnePokerCardSubject.next(users.some((user) => user.isSelected));
  }

  resetGame() {
    const users = this.usersSubject.value.map((user) => ({ ...user, cardSelected: undefined, isSelected: false }));
    const userUuid = this.localStorageService.getUser() ?? '';
    const meUser = users.find((user) => user.id === userUuid);
    this.updateGameStatus(GameStatusEnum.Reveal);
    this.updateUsers(users);
    this.updateMeUser(meUser);
    this.organizeTablePositionCard();
    const gameUuid = this.localStorageService.getGame() ?? '';
    this.gameService.resetGame(gameUuid).subscribe();
  }
}
