import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinGameRoutingModule } from './join-game-routing.module';
import { JoinGameComponent } from './join-game.component';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    JoinGameComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    JoinGameRoutingModule,
  ]
})
export class JoinGameModule { }
