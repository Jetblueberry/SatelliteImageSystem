import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBasePageComponent } from './app-base-page.component';

describe('AppGuideComponent', () => {
  let component: AppBasePageComponent;
  let fixture: ComponentFixture<AppBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBasePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
