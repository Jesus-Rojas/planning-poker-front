import { RoleEnum } from "./role.enum";

export interface PokerCard {
  id: string;
  name: string;
  role: RoleEnum;
  isVisible: boolean;
  isSelected: boolean;
  cardId?: string;
}
