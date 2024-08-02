import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerCardComponent } from './poker-card.component';

xdescribe('PokerCardComponent', () => {
  let component: PokerCardComponent;
  let fixture: ComponentFixture<PokerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
