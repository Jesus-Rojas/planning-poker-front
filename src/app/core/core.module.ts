import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesignSystemModule } from '@design-system/design-system.module';
import { SharedModule } from '@shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageComponent } from './components/page/page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    PageComponent,
  ],
  imports: [
    CommonModule,
    DesignSystemModule,
    RouterOutlet,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    LoaderComponent,
    PageComponent,
  ],
})
export class CoreModule { }
