import { DisplayModeEnum, PokerCard, RoleEnum } from "@shared/types";
import { getId } from "./get-id.util";

export function generateOnePokerCard(attributes: Partial<PokerCard> = { }): PokerCard {
  const {
    id = getId(),
    name = 'Jesus',
    displayMode = DisplayModeEnum.Player,
    role = RoleEnum.Player,
    isVisible = true,
    isSelected = false,
  } = attributes;
  return { id, name, displayMode, isVisible, isSelected, role };
}
