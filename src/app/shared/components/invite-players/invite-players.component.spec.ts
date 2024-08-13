import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvitePlayersComponent } from './invite-players.component';
import { ToastService } from '@shared/services/toast.service';
import { DesignSystemModule } from '@design-system/design-system.module';
import { getFeatherIcons } from '@shared/utils';
import { FeatherModule } from 'angular-feather';

describe('InvitePlayersComponent', () => {
  let component: InvitePlayersComponent;
  let fixture: ComponentFixture<InvitePlayersComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DesignSystemModule,
        FeatherModule.pick(getFeatherIcons(
          ['Clipboard', 'X']
        )),
      ],
      declarations: [InvitePlayersComponent],
      providers: [
        { provide: ToastService, useValue: { showSuccessToast: jest.fn() } }
      ]
    }).compileComponents();

    // Mock navigator.clipboard
    (navigator as unknown as { clipboard: { writeText: () => void }}).clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitePlayersComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize url on init', () => {
    const expectedUrl = window.location.href.replace('playing', 'join');
    component.ngOnInit();
    expect(component.url).toBe(expectedUrl);
  });

  it('should copy link and show toast', () => {
    const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');
    const showSuccessToastSpy = jest.spyOn(toastService, 'showSuccessToast');
    const handleCloseSpy = jest.spyOn(component, 'handleClose');

    component.url = 'http://example.com/join';
    component.copyLink();

    expect(writeTextSpy).toHaveBeenCalledWith('http://example.com/join');
    expect(showSuccessToastSpy).toHaveBeenCalledWith('Enlace copiado al portapapeles');
    expect(handleCloseSpy).toHaveBeenCalled();
  });

  it('should emit closeModal event on handleClose', () => {
    jest.spyOn(component.closeModal, 'emit');
    component.handleClose();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});
