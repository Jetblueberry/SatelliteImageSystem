import { Injectable, Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AppGuideService {
  displayBtnExplore = false;
  constructor(
    private confirmationService: ConfirmationService,
  ) {}

  confirmDialogGuide1() {
    this.confirmationService.confirm({
      key: 'cf1',
      message: 'You are new to this system and unsure how to use? This tour will help you learn about important functions, so you can get on your own way',
      header: 'Tutorial',
      icon: 'fa-solid fa-satellite',
      acceptLabel: 'Start a tour',
      acceptIcon: 'pi pi-arrow-right',
      rejectLabel: 'Later',
      rejectIcon: 'none',
      accept: () => {

        this.confirmDialogGuide2();
      },

    });
  }

  confirmDialogGuide2() {
    this.displayBtnExplore = true;
    this.confirmationService.confirm({
      message: 'Click button Explore map to open catalogue - list of data and add one of this to the map here. Afte added, you will see them listed down in workbench below',
      key: 'cf2',
      header: 'Explore map data',
      icon: 'fa-brands fa-wpexplorer',
      acceptLabel: 'Next',
      acceptIcon: 'pi pi-arrow-right',
      accept: () => {
        this.displayBtnExplore = false;
      },
      reject: () => {
        this.displayBtnExplore = false;
      }
    });
  }
}
