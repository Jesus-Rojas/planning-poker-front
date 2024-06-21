import { Component } from '@angular/core';
import { HeaderStatus } from '../../types/header-status.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  status: HeaderStatus = HeaderStatus.InsideTheGame;
  HeaderStatus = HeaderStatus;
}
