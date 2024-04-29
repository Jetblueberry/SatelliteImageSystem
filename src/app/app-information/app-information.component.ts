import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { AppInformationService } from '../services/app-information-services/app-information.service';

@Component({
  selector: 'app-information',
  templateUrl: './app-information.component.html',
  styleUrls: ['./app-information.component.scss']
})
export class AppInformationComponent {
  constructor(
    public _dataCatalogueService: DataCatalogueService,
    public _dataDetailsService: DataDetailsService,
    public _dataMapService: DataMapService,
    public _appInformationService: AppInformationService,
    public messageService: MessagesService,
  ) {}


}
