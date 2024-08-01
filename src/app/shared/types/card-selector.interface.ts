import { CardSelectorTypeEnum } from "./card-selector-type.enum";

export interface CardSelector {
  id: string;
  type: CardSelectorTypeEnum;
  value: string;
  isSelected: boolean;
}
