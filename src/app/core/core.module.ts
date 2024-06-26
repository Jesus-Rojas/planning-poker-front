import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemModule } from '@design-system/design-system.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageComponent } from './components/page/page.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    DesignSystemModule,
    RouterOutlet,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageComponent,
    LoaderComponent,
  ],
})
export class CoreModule { }
