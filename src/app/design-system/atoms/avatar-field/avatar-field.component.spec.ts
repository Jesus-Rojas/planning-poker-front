import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarFieldComponent } from './avatar-field.component';

xdescribe('AvatarFieldComponent', () => {
  let component: AvatarFieldComponent;
  let fixture: ComponentFixture<AvatarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
