import { PokerCard, RoleEnum } from "@shared/types";
import { getId } from "./get-id.util";

export function generateOnePokerCard(attributes: Partial<PokerCard> = { }): PokerCard {
  const {
    id = getId(),
    name = 'Jesus',
    role = RoleEnum.Player
  } = attributes;
  return { id, name, role };
}
