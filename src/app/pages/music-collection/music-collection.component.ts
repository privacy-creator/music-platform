import { Component, OnInit } from '@angular/core';
import {MusicService} from "../../service/music.service";
import {PlayerService} from "../../service/player.service";

@Component({
  selector: 'app-music-collection',
  templateUrl: './music-collection.component.html',
  styleUrls: ['./music-collection.component.css']
})
export class MusicCollectionComponent implements OnInit {
  musicList: any[] = [];
  filteredMusic: any[] = [];
  searchQuery: string = '';

  constructor(private musicService: MusicService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.musicService.getMusicList().subscribe(data => {
      this.musicList = data;
      this.filteredMusic = data;
    });
  }

  onSearch(): void {
    // Convert the search query to lowercase for case-insensitive searching
    const query = this.searchQuery.toLowerCase();

    // Filter the music list based on the title containing the search query
    this.filteredMusic = this.musicList.filter((music) =>
      music.title.toLowerCase().includes(query)
    );
  }

  playMusic(filename: string, title: string): void {
    this.playerService.changeAudioSource(filename, title);
  }
}
