import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonFieldColorEnum } from '@design-system/atoms/button-field/types';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-invite-players',
  templateUrl: './invite-players.component.html',
  styleUrl: './invite-players.component.scss'
})
export class InvitePlayersComponent implements OnInit {
  constructor(
    private toastService: ToastService,
  ) { }

  @Output() closeModal = new EventEmitter<void>();

  ButtonFieldColorEnum = ButtonFieldColorEnum;

  url = '';

  copyLink() {
    navigator.clipboard.writeText(this.url);
    this.toastService.showSuccessToast('Enlace copiado al portapapeles');
    this.handleClose();
  }

  handleClose(): void {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.url = window.location.href.replace('playing', 'join');
  }
}
