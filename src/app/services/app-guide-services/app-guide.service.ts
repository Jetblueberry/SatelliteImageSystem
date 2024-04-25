import { Injectable, Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AppGuideService {
  constructor(
    private confirmationService: ConfirmationService,
  ) {}

  confirmDialogGuide1() {
    this.confirmationService.confirm({
      key: 'cf1',
      message: 'Getting started with this map?',

      header: 'Help',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Next',
      acceptIcon: 'pi pi-arrow-right',
      accept: () => {
        this.confirmDialogGuide2();
      },
    });
  }

  confirmDialogGuide2() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      key: 'cf2',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
      },
    });
  }
}
