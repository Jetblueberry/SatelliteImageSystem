import { AfterViewInit, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.scss']
})
export class DataDetailsComponent {
  @Input() lst_choosen: any;

  opacityValue = 100;
  ngOnInit() {}

  InitMapAgain() {}
}
