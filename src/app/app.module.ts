import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MusicCollectionComponent } from './pages/music-collection/music-collection.component';
import {HttpClientModule} from "@angular/common/http";
import { CategoriesComponent } from './pages/categories/categories.component';
import { PlayerComponent } from './pages/music-collection/player/player.component';
import {FormsModule} from "@angular/forms";
import { SharePopupComponent } from './pages/music-collection/share-popup/share-popup.component';
import { MusicDetailComponent } from './pages/music-collection/music-detail/music-detail.component';
// import { MusicDetailComponent } from './pages/music-collection/music-detail/music-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MusicCollectionComponent,
    CategoriesComponent,
    PlayerComponent,
    SharePopupComponent,
    MusicDetailComponent,
    // MusicDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
