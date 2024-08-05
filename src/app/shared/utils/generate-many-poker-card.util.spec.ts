import { generateManyPokerCard } from "./generate-many-poker-card.util";

describe('Tests for generateManyPokerCard', () => {
  it('generateManyPokerCard with param default', () => {
    const pokerCards = generateManyPokerCard();
    expect(pokerCards.length).toBe(10);
  });
});
