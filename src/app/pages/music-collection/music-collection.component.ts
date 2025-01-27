import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from "../../service/music.service";
import { PlayerService } from "../../service/player.service";

@Component({
  selector: 'app-music-collection',
  templateUrl: './music-collection.component.html',
  styleUrls: ['./music-collection.component.css']
})
export class MusicCollectionComponent implements AfterViewInit {
  isSharePopupOpen = false;
  shareSongTitle: string = "";
  musicList: any[] = [];
  filteredMusic: any[] = [];
  searchQuery: string = '';

  constructor(
    private musicService: MusicService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.musicService.getMusicList().subscribe(data => {
      this.musicList = data;
      this.filteredMusic = data;

      // Get the title from the route parameters and decode it
      const titleFromUrl = decodeURIComponent(this.route.snapshot.paramMap.get('title') || '');
      if (titleFromUrl) {
        const music = this.musicList.find(m => m.title === titleFromUrl);
        if (music) {
          this.playerService.showPlayer = true;
          this.playMusic(music.filename, music.title, music.id);
        }
      }
    });
  }

  openSharePopup(title: string): void {
    this.shareSongTitle = title;
    this.isSharePopupOpen = true;
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredMusic = this.musicList.filter((music) =>
      music.title.toLowerCase().includes(query)
    );
  }

  playMusic(filename: string, title: string, id: any): void {
    this.playerService.setPlaylist(this.musicList);
    this.playerService.changeAudioSource(filename, title, id);
  }

  receiveData($event: boolean) {
    this.isSharePopupOpen = $event;
  }
}
