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
      message: 'Are you sure that you want to proceed?',

      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
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
