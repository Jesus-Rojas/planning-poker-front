import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesignSystemModule } from '@design-system/design-system.module';
import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageComponent } from './components/page/page.component';


@NgModule({
  declarations: [
    FooterComponent,
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
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    PageComponent,
  ],
})
export class CoreModule { }
