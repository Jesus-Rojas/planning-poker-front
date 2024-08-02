import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerCardListComponent } from './poker-card-list.component';

xdescribe('PokerCardListComponent', () => {
  let component: PokerCardListComponent;
  let fixture: ComponentFixture<PokerCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerCardListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
