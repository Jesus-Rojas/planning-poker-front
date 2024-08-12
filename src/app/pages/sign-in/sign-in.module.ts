import { NgModule } from '@angular/core';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { CoreModule } from '@core/core.module';
import { DesignSystemModule } from '@design-system/design-system.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    SignInRoutingModule,
    CoreModule,
    DesignSystemModule,
    FormsModule,
    SharedModule,
  ]
})
export class SignInModule { }
