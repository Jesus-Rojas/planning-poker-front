import { PokerCard } from "./poker-card.interface";
import { TablePositionEnum } from "./table-position.enum";

export interface TablePositionCard {
  [TablePositionEnum.Top]: PokerCard[];
  [TablePositionEnum.Bottom]: PokerCard[];
  [TablePositionEnum.Left]: PokerCard[];
  [TablePositionEnum.Right]: PokerCard[];
}
