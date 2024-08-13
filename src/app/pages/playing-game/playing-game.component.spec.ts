import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingGameComponent } from './playing-game.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { getFeatherIcons } from '@shared/utils';

describe('PlayingGameComponent', () => {
  let component: PlayingGameComponent;
  let fixture: ComponentFixture<PlayingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayingGameComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      imports: [
        SharedModule,
        FeatherModule.pick(getFeatherIcons(
          ['AlertTriangle', 'Check', 'X', 'Info']
        )),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
