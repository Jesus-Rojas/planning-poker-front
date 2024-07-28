import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrl: './invite-players.component.scss'
})
export class InvitePlayersComponent {
  constructor(
    private toastService: ToastService,
  ) { }

  @Output() close = new EventEmitter<void>();

  ButtonFieldColorEnum = ButtonFieldColorEnum;

  url = window.location.href;

  copyLink() {
    navigator.clipboard.writeText(this.url);
    this.toastService.showSuccessToast('Enlace copiado al portapapeles');
    this.onClose();
  }

  onClose() {
    this.close.emit();
  }
}
