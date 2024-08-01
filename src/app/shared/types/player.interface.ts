import { DisplayModeEnum } from './display-mode.enum';
import { RoleEnum } from './role.enum';

export interface Player {
  uuid: string;
  name: string;
  role: RoleEnum;
  displayMode: DisplayModeEnum;
  score: number;
  cardSelected: string | undefined;
  isActive: boolean;
}
