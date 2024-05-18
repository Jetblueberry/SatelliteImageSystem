import { Component } from '@angular/core';
import { DataMapService } from '../services/data-map-services/data-map.service';
import { DataMapComponent } from '../data-map/data-map.component';
import { DataCatalogueService } from '../services/data-catalogue-services/data-catalogue.service';
import { DataDetailsService } from '../services/data-details-services/data-details.service';
import { MessagesService } from '../services/message.service';
import { ConfirmationService } from 'primeng/api';
import { AppGuideService } from '../services/app-guide-services/app-guide.service';

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

  data_articles = [
    {
      title: 'Satellite images of typhoon Noru show that probably hits Vietnam',
      description: 'Typhoon Noru entered the East Vietnam Sea early on Monday morning after sweeping through the Philippines’ Luzon Island, unleashing winds between 118 to 133km/h and gusts of up to 166km/h',
      imageUrl: 'https://static.tuoitrenews.vn/ttnew/r/2022/09/26/299217291-1696039910775669-1797247525430415875-n-1664167356.png',
      routerLink: 'https://tuoitrenews.vn/news/society/20220926/typhoon-noru-among-strongest-storms-to-hit-vietnam-in-20-years/69261.html',
    },
    {
      title: 'Vietnam Farmers Are Increasingly Using Satellite Technology For Agriculture',
      description: 'Vietnam is expanding the list of digital farming tools for industry development, including the Internet of things and big data and farmers are also using remote sensing capabilities.',
      imageUrl: 'https://vir.com.vn/stores/news_dataimages/nguyenhuong/122018/04/12/in_article/investment-opportunities-in-precision-agriculture-vbf_2.jpg',
      routerLink: 'https://vietnaminsider.vn/vietnam-farmers-are-increasingly-using-satellite-technology-for-agriculture/',
    },
    {
      title: 'At the end of 2024, Vietnam will launch the first radar satellite into orbit',
      description: 'LOTUSat-1 satellite is an Earth observation satellite with the ability to take high-resolution images in all weather conditions day and night using synthetic aperture radar sensor technology.',
      imageUrl: 'https://www.vietnam.vn/wp-content/uploads/2024/04/Cuoi-nam-2024-Viet-Nam-se-phong-ve-tinh-radar.jpg',
      routerLink: 'https://www.vietnam.vn/en/cuoi-nam-2024-viet-nam-se-phong-ve-tinh-radar-dau-tien-len-quy-dao/',
    },
    {
      title: 'Satellite Detected Surface Waters & Evolution in Long An Province, Vietnam',
      description: 'Illustrate the satellite-detected surface waters extent in Long An province and in the southern part of Cambodia, as observed from the Sentinel-1 SAR images.',
      imageUrl: 'https://reliefweb.int/sites/default/files/styles/large/public/previews/52/1f/521fd8be-815e-33cd-b84e-c13b0598c7e2.png.webp?2011378-1-0',
      routerLink: 'https://reliefweb.int/map/viet-nam/satellite-detected-surface-waters-evolution-long-province-vietnam-imagery-analysis-16',
    }
  ]
}
