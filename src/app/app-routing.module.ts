import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GraphsPageComponent } from './graphs-page/graphs-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';


const routes: Routes = [
  {path: '', component: UploadPageComponent},
  {path: 'graph', component: GraphsPageComponent},
  {path: 'faq', component: FaqPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UploadPageComponent, GraphsPageComponent]
