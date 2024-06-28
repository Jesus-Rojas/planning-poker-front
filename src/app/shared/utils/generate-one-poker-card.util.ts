import { PokerCard, RoleEnum } from "@shared/types";
import { getId } from "./get-id.util";

export function generateOnePokerCard(): PokerCard {
  return {
    id: getId(),
    name: 'Jesus',
    role: RoleEnum.Player,
  };
}
