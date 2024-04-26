import { Injectable, Injector } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})

export class AppGuideService {
  displayExploreDialog = false;
  displayLocationDialog = false;
  displayMapSettingDialog = false;
  displayPrintScreenshotDialog = false;
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
    this.displayExploreDialog = true;
    this.confirmationService.confirm({
      message: 'Click button Explore map to open catalogue - list of data and add one of this to the map here. Afte added, you will see them listed down in workbench below',
      key: 'cf2',
      header: 'Explore map data',
      icon: 'fa-brands fa-wpexplorer',
      acceptLabel: 'Next',
      acceptIcon: 'pi pi-arrow-right',
      accept: () => {
        this.displayExploreDialog = false;
        this.confirmDialogGuide3()
      },
      reject: () => {
        this.displayExploreDialog = false;
      }
    });
  }

  confirmDialogGuide3() {
    this.displayLocationDialog = true;
    this.confirmationService.confirm({
      message: 'Enter a location name, the map will drive you to that address by locating a point ',
      key: 'cf3',
      header: 'Location search',
      icon: 'fa-solid fa-location-dot',
      acceptLabel: 'Next',
      acceptIcon: 'pi pi-arrow-right',
      accept: () => {
        this.displayLocationDialog = false;
      },
      reject: () => {
        this.displayLocationDialog = false;
      }
    });
  }
}
