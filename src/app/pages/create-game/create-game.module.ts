import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGameRoutingModule } from './create-game-routing.module';
import { CreateGameComponent } from './create-game.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    CreateGameComponent,
  ],
  imports: [
    CommonModule,
    CreateGameRoutingModule,
    CoreModule,
  ]
})
export class CreateGameModule { }
