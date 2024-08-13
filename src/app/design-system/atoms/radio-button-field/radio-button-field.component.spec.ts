import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RadioButtonFieldComponent } from './radio-button-field.component';

describe('RadioButtonFieldComponent', () => {
  let component: RadioButtonFieldComponent;
  let fixture: ComponentFixture<RadioButtonFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadioButtonFieldComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.name).toBe('');
    expect(component.value).toBe('');
    expect(component.selectedOption).toBe('');
  });

  it('should emit selectedOptionChange on option change', () => {
    const emitSpy = jest.spyOn(component.selectedOptionChange, 'emit');
    component.selectedOption = 'option1';
    component.onOptionChange();
    expect(emitSpy).toHaveBeenCalledWith('option1');
  });
});
