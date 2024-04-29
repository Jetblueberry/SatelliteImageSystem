import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInformationComponent } from './app-information.component';

describe('AppInformationComponent', () => {
  let component: AppInformationComponent;
  let fixture: ComponentFixture<AppInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
