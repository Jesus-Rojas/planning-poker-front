import { generateOnePokerCard } from "./generate-one-poker-card.util";

export function generateManyPokerCard(size = 10) {
  return Array.from({ length: size }, generateOnePokerCard);
}
