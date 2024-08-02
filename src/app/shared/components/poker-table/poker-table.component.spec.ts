import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerTableComponent } from './poker-table.component';

xdescribe('PokerTableComponent', () => {
  let component: PokerTableComponent;
  let fixture: ComponentFixture<PokerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
