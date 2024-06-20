import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingGamePageComponent } from './playing-game-page.component';

describe('PlayingGamePageComponent', () => {
  let component: PlayingGamePageComponent;
  let fixture: ComponentFixture<PlayingGamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingGamePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
