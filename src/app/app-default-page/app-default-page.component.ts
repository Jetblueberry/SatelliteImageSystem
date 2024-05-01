import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { AppGuideService } from '../services/app-guide-services/app-guide.service';
import { AppDefaultPageService } from '../services/app-default-page/app-default-page.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './app-default-page.component.html',
  styleUrls: ['./app-default-page.component.scss']
})
export class AppDefaultPageComponent {
  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
    public _appGuideService: AppGuideService,
    public _appDefaultPageService: AppDefaultPageService,
    public messageService: MessagesService,
    private confirmationService: ConfirmationService,
  ) {}

  data_carousel = [
    {
      name: 'VIETNAM SATELLITE IMAGE SYSTEM',
      description: 'A WEBSITE PROVIDING SATELLITE IMAGE DATA ON VIET NAM TERRITORIES',
      imageUrl: '/assets/Image_background_VN/HangSonDoong.jpg',
    },
    {
      name: 'VIETNAM SATELLITE IMAGE SYSTEM',
      description: 'A LARGE DIVERSITY OF SATELLITE IMAGE DATA TYPES',
      imageUrl: '/assets/Image_background_VN/TamCoc.jpg',
    },
    {
      name: 'VIETNAM SATELLITE IMAGE SYSTEM',
      description: 'EVERY DATA IN VIETNAM SATELLITE IMAGE SYSTEM IS FREE TO DOWNLOAD',
      imageUrl: '/assets/Image_background_VN/YenBai.jpg',
    },
    {
      name: 'VIETNAM SATELLITE IMAGE SYSTEM',
      description: 'PREVIEW DATA ON MAP BY YOUR OWN WAY',
      imageUrl: '/assets/Image_background_VN/ForestDense.jpg',
    }
  ];

}
