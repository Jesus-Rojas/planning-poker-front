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

  classIconClose = '';
  classBodyText = '';
  classTitleText = '';
  classActionSecondary = '';
  classActionPrimary = '';
  classIconVariant = '';
  classToast = '';
  classVariant = '';
  toastIcon = '';
  isTypeStandardWithActions = false;

  updateClassIconClose() {
    const classesList = ['icon-close', this.classVariant];
    this.classIconClose = classesList.join(' ');
  }

  updateClassBodyText() {
    const classesList = ['body-text', this.classVariant];
    this.classBodyText = classesList.join(' ');
  }

  updateClassTitleText() {
    const classesList = ['title-text', this.classVariant];
    this.classTitleText = classesList.join(' ');
  }

  updateClassActionSecondary() {
    const classesList = ['action-secondary', this.classVariant];
    this.classActionSecondary = classesList.join(' ');
  }

  updateClassActionPrimary() {
    const classesList = ['action-primary', this.classVariant];
    this.classActionPrimary = classesList.join(' ');
  }

  updateClassIconVariant() {
    const classesList = ['icon-variant', this.classVariant];
    this.classIconVariant = classesList.join(' ');
  }

  updateClassToast() {
    const classesList = ['toast', this.classVariant];
    this.classToast = classesList.join(' ');
  }

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
    this.updateClassToast();
    this.updateClassIconVariant();
    this.updateClassActionPrimary();
    this.updateClassActionSecondary();
    this.updateClassTitleText();
    this.updateClassBodyText();
    this.updateClassIconClose();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) this.updateIsTypeStandardWithActions();

    if (changes['variant']) {
      this.updateToastIcon();
      this.updateClassVariant();
      this.updateClassToast();
      this.updateClassIconVariant();
      this.updateClassActionPrimary();
      this.updateClassActionSecondary();
      this.updateClassTitleText();
      this.updateClassBodyText();
      this.updateClassIconClose();
    }
  }
}
