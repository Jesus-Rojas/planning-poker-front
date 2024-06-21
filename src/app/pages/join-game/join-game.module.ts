import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinGameRoutingModule } from './join-game-routing.module';
import { JoinGameComponent } from './join-game.component';

@NgModule({
  declarations: [
    JoinGameComponent,
  ],
  imports: [
    CommonModule,
    JoinGameRoutingModule,
  ]
})
export class JoinGameModule { }
