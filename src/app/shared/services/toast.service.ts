import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage, ToastType, ToastVariant } from '../../design-system/molecules/toast/types';
import { getId } from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  private timeouts = new Map<string, NodeJS.Timeout>();
  messages$ = this.messagesSubject.asObservable();

  showToast(optionsToast: Omit<ToastMessage, 'id'>) {
    const toastId = getId();
    this.messagesSubject.next([
      ...this.messagesSubject.value,
      { ...optionsToast, id: toastId },
    ]);
    const timeout = setTimeout(() => this.removeToast(toastId), 3000);
    this.timeouts.set(toastId, timeout);
  }

  removeToast(toastId: ToastMessage['id']) {
    clearTimeout(this.timeouts.get(toastId));
    this.timeouts.delete(toastId);
    this.messagesSubject.next(
      this.messagesSubject.value.filter((messageSubject) => (messageSubject.id !== toastId))
    );
  }

  showSuccessToast(title: string, body: string) {
    this.showToast({ title, body, variant: ToastVariant.Success, type: ToastType.Standard });
  }

  showErrorToast(title: string, body: string) {
    this.showToast({ title, body, variant: ToastVariant.Error, type: ToastType.Standard });
  }

  showInformationToast(title: string, body: string) {
    this.showToast({ title, body, variant: ToastVariant.Information, type: ToastType.Standard });
  }

  showAlertToast(title: string, body: string) {
    this.showToast({ title, body, variant: ToastVariant.Alert, type: ToastType.Standard });
  }
}
