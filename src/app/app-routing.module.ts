import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {MusicCollectionComponent} from "./pages/music-collection/music-collection.component";
import {CategoriesComponent} from "./pages/categories/categories.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'music-collection', component: MusicCollectionComponent },
  { path: 'music-collection/:title', component: MusicCollectionComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:category', component: MusicCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
