import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayingGameRoutingModule } from './playing-game-routing.module';
import { PlayingGameComponent } from './playing-game.component';

@NgModule({
  declarations: [
    PlayingGameComponent,
  ],
  imports: [
    CommonModule,
    PlayingGameRoutingModule
  ]
})
export class PlayingGameModule { }
