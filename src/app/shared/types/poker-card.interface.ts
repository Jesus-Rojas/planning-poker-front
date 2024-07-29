import { DisplayModeEnum } from "./display-mode.enum";
import { RoleEnum } from "./role.enum";

export interface PokerCard {
  id: string;
  name: string;
  displayMode: DisplayModeEnum;
  role: RoleEnum;
  isVisible: boolean;
  isSelected: boolean;
  cardId?: string;
}
