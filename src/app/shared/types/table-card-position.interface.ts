import { PokerCard } from "./poker-card.interface";
import { TablePosition } from "./table-position.enum";

export interface TablePositionCard {
  [TablePosition.TOP]: PokerCard[];
  [TablePosition.BOTTOM]: PokerCard[];
  [TablePosition.LEFT]: PokerCard[];
  [TablePosition.RIGHT]: PokerCard[];
}
