import { PokerCard } from "./poker-card.interface";
import { TablePosition } from "./table-position.enum";

export interface TablePositionCard {
  [TablePosition.Top]: PokerCard[];
  [TablePosition.Bottom]: PokerCard[];
  [TablePosition.Left]: PokerCard[];
  [TablePosition.Right]: PokerCard[];
}
