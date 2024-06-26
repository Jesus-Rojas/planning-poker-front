import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ToastService } from '@design-system/molecules/services/toast.service';
import { ToastMessage, ToastType, ToastVariant } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }

  ToastVariant = ToastVariant;
  ToastType = ToastType;

  getToastIcon(variant: ToastVariant) {
    if (variant === ToastVariant.Success) return 'check';
    if (variant === ToastVariant.Information) return 'info';
    return 'alert-triangle';
  }
}
