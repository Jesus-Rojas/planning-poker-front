import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    GameService,
    LocalStorageService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class SharedModule { }
