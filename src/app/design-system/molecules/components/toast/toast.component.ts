import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from '@design-system/molecules/services/toast.service';
import { ToastMessage, ToastType, ToastVariant } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {
  constructor(private toastService: ToastService) { }

  private subscription = new Subscription();
  toastMessages: ToastMessage[] = [];

  ToastVariant = ToastVariant;
  ToastType = ToastType;

  ngOnInit() {
    const messagesSubscription = this.toastService
      .messages$
      .subscribe((toastMessages) => (this.toastMessages = toastMessages));

    this.subscription.add(messagesSubscription);
  }

  getToastIcon(variant: ToastVariant) {
    if (variant === ToastVariant.Success) return 'check';
    if (variant === ToastVariant.Information) return 'info';
    return 'alert-triangle';
  }

  removeToast(toastId: number) {
    this.toastService.removeToast(toastId);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
