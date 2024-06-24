import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {
  constructor(
    private loaderService: LoaderService
  ) { }

  $isLoading = this.loaderService.$isLoading;
}
