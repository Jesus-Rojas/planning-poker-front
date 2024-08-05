import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokerCardListComponent } from './poker-card-list.component';
import { PokerTableService } from '@shared/services/poker-table.service';
import { of } from 'rxjs';
import { RoleEnum } from '@shared/types';
import { generateOnePokerCard } from '@shared/utils';

describe('PokerCardListComponent', () => {
  let component: PokerCardListComponent;
  let fixture: ComponentFixture<PokerCardListComponent>;
  let pokerTableService: PokerTableService;

  beforeEach(async () => {
    const pokerTableServiceMock = {
      meUser$: of({ role: RoleEnum.Admin }),
      convertToAdmin: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PokerCardListComponent],
      providers: [
        { provide: PokerTableService, useValue: pokerTableServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerCardListComponent);
    component = fixture.componentInstance;
    pokerTableService = TestBed.inject(PokerTableService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize canConvertToAdmin based on meUser role', () => {
    expect(component.canConvertToAdmin).toBe(true);
  });

  it('should show context menu on right click if canConvertToAdmin is true and pokerCard is not admin', () => {
    const pokerCard = generateOnePokerCard({ role: RoleEnum.Player });
    const event = new MouseEvent('contextmenu', { clientX: 100, clientY: 100 });

    component.onRightClick(event, pokerCard);
    expect(component.contextMenuVisible).toBe(true);
    expect(component.contextMenuPosition).toEqual({ x: 100, y: 100 });
    expect(component.selectedPokerCard).toEqual(pokerCard);
  });

  it('should not show context menu on right click if canConvertToAdmin is false', () => {
    component.canConvertToAdmin = false;
    const pokerCard = generateOnePokerCard({ role: RoleEnum.Player });
    const event = new MouseEvent('contextmenu', { clientX: 100, clientY: 100 });

    component.onRightClick(event, pokerCard);
    expect(component.contextMenuVisible).toBe(false);
  });

  it('should hide context menu on document click', () => {
    component.contextMenuVisible = true;
    component.onDocumentClick();
    expect(component.contextMenuVisible).toBe(false);
  });

  it('should convert to admin and hide context menu', () => {
    const pokerCard = generateOnePokerCard({ role: RoleEnum.Player });
    component.selectedPokerCard = pokerCard;

    component.convertToAdmin();
    expect(pokerTableService.convertToAdmin).toHaveBeenCalledWith(pokerCard.id);
    expect(component.contextMenuVisible).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
