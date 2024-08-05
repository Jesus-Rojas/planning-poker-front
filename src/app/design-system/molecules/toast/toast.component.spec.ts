import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastType, ToastVariant } from './types';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.variant).toBe(ToastVariant.Success);
    expect(component.type).toBe(ToastType.Standard);
    expect(component.body).toBe('');
    expect(component.title).toBe('');
  });

  it('should update classVariant and toastIcon on variant change', () => {
    component.variant = ToastVariant.Error;
    component.ngOnChanges({
      variant: {
        currentValue: ToastVariant.Error,
        previousValue: ToastVariant.Success,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.classVariant).toBe('error');
    expect(component.toastIcon).toBe('alert-triangle');
  });

  it('should update isTypeStandardWithActions on type change', () => {
    component.type = ToastType.StandardWithActions;
    component.ngOnChanges({
      type: {
        currentValue: ToastType.StandardWithActions,
        previousValue: ToastType.Standard,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.isTypeStandardWithActions).toBe(true);
  });

  it('should emit close event on closeToast', () => {
    const emitSpy = jest.spyOn(component.close, 'emit');
    component.closeToast();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should initialize class properties on init', () => {
    component.ngOnInit();
    expect(component.classVariant).toBe('success');
    expect(component.toastIcon).toBe('check');
    expect(component.isTypeStandardWithActions).toBe(false);
  });
});
