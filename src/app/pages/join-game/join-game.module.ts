import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinGameRoutingModule } from './join-game-routing.module';
import { JoinGameComponent } from './join-game.component';
import { CoreModule } from '@core/core.module';
import { DesignSystemModule } from '@design-system/design-system.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    JoinGameComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    DesignSystemModule,
    JoinGameRoutingModule,
    SharedModule,
  ]
})
export class JoinGameModule { }
