import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage, ToastType, ToastVariant } from '../components/toast/types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastId = 0;
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();

  showToast(optionsToast: Omit<ToastMessage, 'id'>) {
    const toastId = ++this.toastId;
    this.messagesSubject.next([
      ...this.messagesSubject.value,
      { ...optionsToast, id: toastId }
    ]);

    setTimeout(() => (this.removeToast(toastId)), 3000);
  }

  removeToast(toastId: number) {
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
