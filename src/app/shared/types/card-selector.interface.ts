import { CardSelectorType } from "./card-selector-type.enum";

export interface CardSelector {
  id: string;
  type: CardSelectorType;
  value: string;
  isSelected: boolean;
}
