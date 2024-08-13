import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokerCardComponent } from './poker-card.component';
import { PokerCardSizeEnum, PokerCardVariantEnum } from '@shared/types';

describe('PokerCardComponent', () => {
  let component: PokerCardComponent;
  let fixture: ComponentFixture<PokerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.size).toBe(PokerCardSizeEnum.Small);
    expect(component.variant).toBe(PokerCardVariantEnum.Default);
    expect(component.isVisible).toBe(true);
    expect(component.isSelected).toBe(false);
  });

  it('should render correct size classes', () => {
    component.size = PokerCardSizeEnum.Medium;
    component.ngOnInit();
    fixture.detectChanges();

    const containerElement: HTMLElement = fixture.nativeElement.querySelector('.container');
    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(containerElement.classList).toContain('medium');
    expect(cardElement.classList).toContain('medium');
  });

  it('should render correct variant classes', () => {
    component.variant = PokerCardVariantEnum.Picker;
    component.ngOnInit();
    fixture.detectChanges();

    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList).toContain('picker');
  });

  it('should handle visibility correctly', () => {
    component.isVisible = false;
    component.ngOnInit();
    fixture.detectChanges();

    const containerElement: HTMLElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.classList).toContain('hidden');
  });

  it('should handle selection state correctly', () => {
    component.isSelected = true;
    component.ngOnInit();
    fixture.detectChanges();

    const cardElement: HTMLElement = fixture.nativeElement.querySelector('.card');
    expect(cardElement.classList).toContain('is-selected');
  });
});
