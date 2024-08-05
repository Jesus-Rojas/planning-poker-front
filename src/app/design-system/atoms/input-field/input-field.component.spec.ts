import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';
import { InputFieldVariantEnum } from './types';
import { By } from '@angular/platform-browser';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.headerText).toBe('');
    expect(component.placeholder).toBe('');
    expect(component.value).toBe('');
    expect(component.type).toBe('text');
    expect(component.disabled).toBe(false);
    expect(component.descriptionText).toBe('');
    expect(component.variant).toBe(InputFieldVariantEnum.Dark);
    expect(component.isInvalid).toBe(false);
    expect(component.isValid).toBe(false);
  });

  it('should update classDisabled on disabled change', () => {
    component.disabled = true;
    component.ngOnChanges({
      disabled: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classDisabled).toBe('disabled');
  });

  it('should update classIsValid on isValid change', () => {
    component.isValid = true;
    component.ngOnChanges({
      isValid: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classIsValid).toBe('is-valid');
  });

  it('should update classIsInvalid on isInvalid change', () => {
    component.isInvalid = true;
    component.ngOnChanges({
      isInvalid: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.classIsInvalid).toBe('is-invalid');
  });

  it('should emit valueChange on input event', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const emitSpy = jest.spyOn(component.valueChange, 'emit');

    inputElement.value = 'new value';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe('new value');
    expect(emitSpy).toHaveBeenCalledWith('new value');
  });

  it('should initialize class properties on init', () => {
    component.ngOnInit();
    expect(component.classDisabled).toBe('');
    expect(component.classIsValid).toBe('');
    expect(component.classIsInvalid).toBe('');
  });
});
