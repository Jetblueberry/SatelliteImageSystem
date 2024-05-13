import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { AppGuideService } from '../services/app-guide-services/app-guide.service';

@Component({
  selector: 'app-guide',
  templateUrl: './app-guide.component.html',
  styleUrls: ['./app-guide.component.scss']
})
export class AppGuideComponent {

  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
    public _appGuideService: AppGuideService,
    public messageService: MessagesService,
    private confirmationService: ConfirmationService,
  ) {}


}