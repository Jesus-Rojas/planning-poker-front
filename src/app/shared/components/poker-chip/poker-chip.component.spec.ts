import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerChipComponent } from './poker-chip.component';

describe('PokerChipComponent', () => {
  let component: PokerChipComponent;
  let fixture: ComponentFixture<PokerChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
