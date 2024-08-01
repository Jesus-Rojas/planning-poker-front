import { GameStatusEnum } from './game-status.enum';
import { Player } from './player.interface';

export interface Game {
  name: string;
  status: GameStatusEnum;
  users: Player[];
}
