import { GameStatusEnum } from './game-status.enum';
import { Player } from './player.interface';
import { ScoreCard } from './score-card.interface';

export interface Game {
  name: string;
  status: GameStatusEnum;
  users: Player[];
  scoreCards: ScoreCard[];
  average: number;
}
