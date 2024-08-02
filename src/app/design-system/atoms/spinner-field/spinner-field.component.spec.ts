import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerFieldComponent } from './spinner-field.component';

xdescribe('SpinnerFieldComponent', () => {
  let component: SpinnerFieldComponent;
  let fixture: ComponentFixture<SpinnerFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
