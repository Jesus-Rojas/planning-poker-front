import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { DesignSystemModule } from '@design-system/design-system.module';
import { PokerTableComponent } from './components/poker-table/poker-table.component';
import { PokerCardComponent } from './components/poker-card/poker-card.component';

@NgModule({
  imports: [
    CommonModule,
    DesignSystemModule,
  ],
  declarations: [
    PokerChipComponent,
    ToastContainerComponent,
    PokerTableComponent,
    PokerCardComponent,
  ],
  exports: [
    PokerChipComponent,
    ToastContainerComponent,
    PokerTableComponent,
  ],
})
export class SharedModule { }
