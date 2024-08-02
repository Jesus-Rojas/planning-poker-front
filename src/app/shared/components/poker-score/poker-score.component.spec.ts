import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerScoreComponent } from './poker-score.component';

describe('PokerScoreComponent', () => {
  let component: PokerScoreComponent;
  let fixture: ComponentFixture<PokerScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
