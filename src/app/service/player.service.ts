import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  isPlaying = false;
  showPlayer = false;
  songPlaying: string = '';
  audioSource: HTMLAudioElement = new Audio();
  playlist: { title: string; filename: string; id: number }[] = [];
  currentSongIndex: number = 0;

  constructor() {
    this.audioSource.addEventListener('ended', () => this.playNext());
    this.audioSource.addEventListener('timeupdate', () => this.updateProgress());
  }

  // Add songs to the playlist
  setPlaylist(songs: { title: string; filename: string; id: number }[]): void {
    this.playlist = songs;
  }

  changeAudioSource(audioSource: string, title: string, id: any): void {
    this.showPlayer = true;
    this.songPlaying = title;
    this.currentSongIndex = id;
    document.title = title;

      if (this.audioSource) {
          this.audioSource.src = `assets/music/${audioSource}`;
          this.audioSource.play();
          this.isPlaying = true;
      }
  }

  public play(): void {
    if (this.audioSource) {
      if (this.audioSource.paused) {
        this.audioSource.play();
        this.isPlaying = true;
      } else {
        this.audioSource.pause();
        this.isPlaying = false;
      }
    } else {
      console.error('Audio element not found');
    }
  }

  // Play the current song in the playlist
  private playCurrentSong(): void {
    const song = this.playlist[this.currentSongIndex];
    if (song) {
      this.changeAudioSource(song.filename, song.title, song.id);
    }
  }

  // Play the next song in the playlist
  playNext(): void {
    if (this.currentSongIndex >= this.playlist.length) {
      this.currentSongIndex = 0; // Loop back to the start of the playlist
    }
    this.playCurrentSong();
  }

  public updateProgress(): void {
    const progressBar = document.getElementById('progress-bar') as HTMLDivElement;
    const currentTime = document.getElementById('current-time');
    const totalTime = document.getElementById('total-time');

    if (this.audioSource && progressBar) {
      const current = this.audioSource.currentTime;
      const duration = this.audioSource.duration;

      // Update progress bar width
      const progressPercent = (current / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;

      // Update current time and total time
      if (currentTime) currentTime.textContent = this.formatTime(current);
      if (totalTime) totalTime.textContent = this.formatTime(duration);
    }
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  public updateVolume(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (this.audioSource && inputElement) {
      this.audioSource.volume = parseFloat(inputElement.value);
    }
  }

  public seekAudio(event: MouseEvent): void {
    const progressContainer = event.target as HTMLElement;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = progressContainer.offsetWidth;

    if (this.audioSource && this.audioSource.duration) {
      const duration = this.audioSource.duration;
      this.audioSource.currentTime = (clickX / width) * duration;
    }
  }
}
