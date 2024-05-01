import { Injectable, Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AppDefaultPageService {
  displayMainPage = false;

  displayThisMain() {
    this.displayMainPage = true;
  }
}
