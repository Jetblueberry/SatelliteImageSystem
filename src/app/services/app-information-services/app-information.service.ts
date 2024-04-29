import { Injectable, Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AppInformationService {
  displayDialog = false;

  showInformation() {
    this.displayDialog = true;
  }
}
