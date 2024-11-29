import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {MusicCollectionComponent} from "./pages/music-collection/music-collection.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'music-collection', component: MusicCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
