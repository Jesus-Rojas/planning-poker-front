import { DisplayModeEnum } from "./display-mode.enum";

export interface RequestJoinGame {
  displayMode: DisplayModeEnum;
  name: string;
}
