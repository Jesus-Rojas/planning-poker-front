import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { DesignSystemModule } from '@design-system/design-system.module';
import { CreateGameRoutingModule } from './create-game-routing.module';
import { CreateGameComponent } from './create-game.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CreateGameComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    CreateGameRoutingModule,
    DesignSystemModule,
    FormsModule,
    SharedModule,
  ]
})
export class CreateGameModule { }
