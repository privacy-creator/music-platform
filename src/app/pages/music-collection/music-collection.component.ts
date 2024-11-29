import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Song {
  filename: string;
  title: string;
  category: string;
  language: string;
}

@Component({
  selector: 'app-music-collection',
  templateUrl: './music-collection.component.html',
  styleUrls: ['./music-collection.component.css']
})
export class MusicCollectionComponent implements OnInit {
  songs: Song[] = [];
  filteredSongs: Song[] = [];
  category: string | null = null;
  currentlyPlaying: Song | null = null; // Add this property
  title: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadSongs();

    // Get the category from the route parameter
    this.route.params.subscribe(params => {
      this.category = params['category'] || null;
      this.filterSongs();
      console.log(params);
      this.title = params['title'] || null;

      // If a title is provided, auto-play the corresponding song
      if (this.title) {
        this.autoPlaySong(this.title);
      }
    });

  }

  loadSongs(): void {
    const musicJson = 'assets/music/music.json';

    this.http.get<Song[]>(musicJson).subscribe((data: Song[]) => {
      this.songs = data;
      this.filterSongs();

      // If a title is provided, auto-play the corresponding song
      if (this.title) {
        this.autoPlaySong(this.title);
      }
    });
  }

  filterSongs(): void {
    if (this.category) {
      this.filteredSongs = this.songs.filter(song => song.category === this.category);
    } else {
      this.filteredSongs = this.songs;
    }
  }

  autoPlaySong(title: string): void {
    console.log(this.songs);
    const songToPlay = this.songs.find(song => song.title.toLowerCase() == title.toLowerCase());
    console.log(songToPlay);
    if (songToPlay) {
      this.playSong(songToPlay);
    }
  }

  playSong(song: Song): void {
    this.currentlyPlaying = song;
  }
}
