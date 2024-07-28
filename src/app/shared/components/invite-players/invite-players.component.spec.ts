import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitePlayersComponent } from './invite-players.component';

describe('InvitePlayersComponent', () => {
  let component: InvitePlayersComponent;
  let fixture: ComponentFixture<InvitePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvitePlayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
