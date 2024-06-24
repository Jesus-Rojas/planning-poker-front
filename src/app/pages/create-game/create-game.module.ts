import { NgModule } from '@angular/core';

import { CreateGameRoutingModule } from './create-game-routing.module';
import { CreateGameComponent } from './create-game.component';
import { CoreModule } from '../../core/core.module';
import { DesignSystemModule } from '../../design-system/design-system.module';


@NgModule({
  declarations: [
    CreateGameComponent,
  ],
  imports: [
    CreateGameRoutingModule,
    CoreModule,
    DesignSystemModule,
  ]
})
export class CreateGameModule { }
