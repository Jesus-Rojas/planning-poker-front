import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { DesignSystemModule } from '@design-system/design-system.module';
import { PokerTableComponent } from './components/poker-table/poker-table.component';
import { PokerCardComponent } from './components/poker-card/poker-card.component';
import { CardSelectorComponent } from './components/card-selector/card-selector.component';
import { InvitePlayersComponent } from './components/invite-players/invite-players.component';
import { FeatherModule } from 'angular-feather';
import { PokerCardListComponent } from './components/poker-card-list/poker-card-list.component';
import { PokerScoreComponent } from './components/poker-score/poker-score.component';
import { DecimalToCommaPipe } from './pipes/decimal-to-comma.pipe';

@NgModule({
  imports: [
    CommonModule,
    DesignSystemModule,
    FeatherModule,
  ],
  declarations: [
    PokerChipComponent,
    ToastContainerComponent,
    PokerTableComponent,
    PokerCardComponent,
    CardSelectorComponent,
    InvitePlayersComponent,
    PokerCardListComponent,
    PokerScoreComponent,
    DecimalToCommaPipe,
  ],
  exports: [
    PokerScoreComponent,
    PokerCardComponent,
    PokerChipComponent,
    ToastContainerComponent,
    PokerTableComponent,
    CardSelectorComponent,
    InvitePlayersComponent,
    PokerCardListComponent,
    DecimalToCommaPipe,
  ],
})
export class SharedModule { }
