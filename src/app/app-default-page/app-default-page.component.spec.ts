import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDefaultPageComponent } from './app-default-page.component';

describe('AppGuideComponent', () => {
  let component: AppDefaultPageComponent;
  let fixture: ComponentFixture<AppDefaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDefaultPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
