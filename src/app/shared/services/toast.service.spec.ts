import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import {
  ToastMessage,
  ToastType,
  ToastVariant,
} from '@design-system/molecules/toast/types';

const mockId = 'mockId';

jest.mock('@shared/utils', () => ({
  getId: jest.fn(() => mockId),
}));

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast message', () => {
    const message: Omit<ToastMessage, 'id'> = {
      title: 'Test Toast',
      body: 'This is a test toast',
      variant: ToastVariant.Success,
      type: ToastType.Standard,
    };

    service.showToast(message);

    service.messages$.subscribe((messages) => {
      expect(messages).toEqual([{ ...message, id: 'mockId' }]);
    });
  });

  it('should remove a toast message', () => {
    const message: ToastMessage = {
      id: 'mockId',
      title: 'Test Toast',
      body: 'This is a test toast',
      variant: ToastVariant.Success,
      type: ToastType.Standard,
    };

    service.showToast(message);
    service.removeToast('mockId');

    service.messages$.subscribe((messages) => {
      expect(messages).toEqual([]);
    });
  });

  describe('showSuccessToast', () => {
    it('should show a success toast', () => {
      service.showSuccessToast('Success', 'Success message');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Success',
            body: 'Success message',
            variant: ToastVariant.Success,
            type: ToastType.Standard,
          },
        ]);
      });
    });

    it('should show a success toast without body', () => {
      service.showSuccessToast('Success');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Success',
            body: '',
            variant: ToastVariant.Success,
            type: ToastType.Standard,
          },
        ]);
      });
    });
  });

  describe('showErrorToast', () => {
    it('should show an error toast', () => {
      service.showErrorToast('Error', 'Error message');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Error',
            body: 'Error message',
            variant: ToastVariant.Error,
            type: ToastType.Standard,
          },
        ]);
      });
    });

    it('should show an error toast without body', () => {
      service.showErrorToast('Error');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Error',
            body: '',
            variant: ToastVariant.Error,
            type: ToastType.Standard,
          },
        ]);
      });
    });
  });

  describe('showInformationToast', () => {
    it('should show an information toast', () => {
      service.showInformationToast('Information', 'Information message');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Information',
            body: 'Information message',
            variant: ToastVariant.Information,
            type: ToastType.Standard,
          },
        ]);
      });
    });

    it('should show an information toast without body', () => {
      service.showInformationToast('Information');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Information',
            body: '',
            variant: ToastVariant.Information,
            type: ToastType.Standard,
          },
        ]);
      });
    });
  });

  describe('showWarningToast', () => {
    it('should show an alert toast', () => {
      service.showAlertToast('Alert', 'Alert message');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Alert',
            body: 'Alert message',
            variant: ToastVariant.Alert,
            type: ToastType.Standard,
          },
        ]);
      });
    });

    it('should show an alert toast without body', () => {
      service.showAlertToast('Alert');

      service.messages$.subscribe((messages) => {
        expect(messages).toEqual([
          {
            id: 'mockId',
            title: 'Alert',
            body: '',
            variant: ToastVariant.Alert,
            type: ToastType.Standard,
          },
        ]);
      });
    });
  });

  it('should auto-remove toast after timeout', () => {
    jest.useFakeTimers();

    const message: Omit<ToastMessage, 'id'> = {
      title: 'Auto-remove Toast',
      body: 'This toast will auto-remove',
      variant: ToastVariant.Information,
      type: ToastType.Standard,
    };

    service.showToast(message);

    jest.advanceTimersByTime(3000);

    service.messages$.subscribe((messages) => {
      expect(messages).toEqual([]);
    });

    jest.useRealTimers();
  });
});
