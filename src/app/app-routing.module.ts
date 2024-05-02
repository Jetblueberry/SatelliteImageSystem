import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCatalogueComponent } from './data-catalogue/data-catalogue.component';
import { DataMapComponent } from './data-map/data-map.component';
import { AppDefaultPageComponent } from './app-default-page/app-default-page.component';
import { AppBasePageComponent } from './app-base-page/app-base-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppDefaultPageComponent,
  },
  {
    path: 'base-page',
    component: AppBasePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
