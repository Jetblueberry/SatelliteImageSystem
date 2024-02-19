import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCatalogueComponent } from './data-catalogue/data-catalogue.component';
import { DataMapComponent } from './data-map/data-map.component';

const routes: Routes = [
  {
    path: 'data-catalogue',
    component: DataCatalogueComponent,
  },
  {
    path: '',
    component: DataMapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
