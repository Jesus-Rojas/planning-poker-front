import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayingGameRoutingModule } from './playing-game-routing.module';
import { PlayingGameComponent } from './playing-game.component';
import { SharedModule } from '@shared/shared.module';
import { DesignSystemModule } from '@design-system/design-system.module';

@NgModule({
  declarations: [
    PlayingGameComponent,
  ],
  imports: [
    CommonModule,
    PlayingGameRoutingModule,
    SharedModule,
  ]
})
export class PlayingGameModule { }
