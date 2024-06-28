import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PokerChipComponent } from './components/poker-chip/poker-chip.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { DesignSystemModule } from '@design-system/design-system.module';

@NgModule({
  imports: [
    CommonModule,
    DesignSystemModule,
  ],
  declarations: [
    PokerChipComponent,
    ToastContainerComponent,
  ],
  exports: [
    PokerChipComponent,
    ToastContainerComponent,
  ],
})
export class SharedModule { }
