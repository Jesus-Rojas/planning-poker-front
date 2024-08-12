import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { CoreModule } from '@core/core.module';
import { DesignSystemModule } from '@design-system/design-system.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SignUpRoutingModule,
    CoreModule,
    DesignSystemModule,
    FormsModule,
    SharedModule,
  ]
})
export class SignUpModule { }
