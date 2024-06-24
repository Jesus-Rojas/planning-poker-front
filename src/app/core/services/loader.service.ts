import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoadingSubject = new BehaviorSubject(false);
  public $isLoading = this.isLoadingSubject.asObservable();

  public showLoader() {
    this.isLoadingSubject.next(true);
  }

  public hideLoader() {
    this.isLoadingSubject.next(false);
  }
}
