import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastType, ToastVariant } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  private _variant = ToastVariant.Success;
  classVariant = '';
  toastIcon = '';

  @Input()
  set variant(variant: ToastVariant) {
    this._variant = variant;

    const classes = {
      [ToastVariant.Success]: 'success',
      [ToastVariant.Information]: 'info',
      [ToastVariant.Error]: 'error',
      [ToastVariant.Alert]: 'alert',
    };
    this.classVariant = classes[variant];

    const icons = {
      [ToastVariant.Success]: 'check',
      [ToastVariant.Information]: 'info',
      [ToastVariant.Error]: 'alert-triangle',
      [ToastVariant.Alert]: 'alert-triangle',
    };

    this.toastIcon = icons[variant];
  };

  get variant() {
    return this._variant;
  }

  @Input() body = '';
  @Input() title = '';
  @Input() type = ToastType.Standard;
  @Output() close = new EventEmitter<void>();

  ToastVariant = ToastVariant;
  ToastType = ToastType;

  closeToast() {
    this.close.emit();
  }
}
