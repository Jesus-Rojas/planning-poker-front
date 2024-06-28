import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ToastType, ToastVariant } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnChanges {
  @Input() variant = ToastVariant.Success;
  @Input() type = ToastType.Standard;
  @Input() body = '';
  @Input() title = '';
  @Output() close = new EventEmitter<void>();

  classVariant = '';
  toastIcon = '';
  isTypeStandardWithActions = false;

  updateClassVariant() {
    const classes = {
      [ToastVariant.Success]: 'success',
      [ToastVariant.Information]: 'info',
      [ToastVariant.Error]: 'error',
      [ToastVariant.Alert]: 'alert',
    };
    this.classVariant = classes[this.variant];
  }

  updateToastIcon() {
    const icons = {
      [ToastVariant.Success]: 'check',
      [ToastVariant.Information]: 'info',
      [ToastVariant.Error]: 'alert-triangle',
      [ToastVariant.Alert]: 'alert-triangle',
    };

    this.toastIcon = icons[this.variant];
  }

  updateIsTypeStandardWithActions() {
    this.isTypeStandardWithActions = this.type === ToastType.StandardWithActions;
  }

  closeToast() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.updateIsTypeStandardWithActions();
    this.updateToastIcon();
    this.updateClassVariant();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.updateIsTypeStandardWithActions();
    }

    if (changes['variant']) {
      this.updateToastIcon();
      this.updateClassVariant();
    }
  }
}
