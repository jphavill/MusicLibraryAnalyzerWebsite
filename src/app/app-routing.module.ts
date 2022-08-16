import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraphsPageComponent } from './graphs-page/graphs-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';


const routes: Routes = [
  {path: '', component: UploadPageComponent},
  {path: 'graph', component: GraphsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UploadPageComponent, GraphsPageComponent]
