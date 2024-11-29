import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music-collection',
  templateUrl: './music-collection.component.html',
  styleUrls: ['./music-collection.component.css']
})
export class MusicCollectionComponent implements OnInit {
  songs: string[] = [];
  currentlyPlaying: string | null = null; // Track the currently playing song

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    const musicJson = 'assets/music/music.json';

    this.http.get<string[]>(musicJson).subscribe((data: string[]) => {
      this.songs = data;
    });
  }

  playSong(song: string): void {
    this.currentlyPlaying = song;
  }
}
