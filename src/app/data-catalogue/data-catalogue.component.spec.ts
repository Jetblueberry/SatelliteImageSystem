import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCatalogueComponent } from './data-catalogue.component';

describe('DataCatalogueComponent', () => {
  let component: DataCatalogueComponent;
  let fixture: ComponentFixture<DataCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataCatalogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
