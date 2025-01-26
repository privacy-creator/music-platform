import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  isPlaying = false;
  showPlayer = false;
  songPlaying: string = "";
  audioSource: HTMLAudioElement = new Audio();

  constructor() {}

  changeAudioSource(audioSource: string, title: string): void {
    this.showPlayer = true;
    this.songPlaying = title;
    document.title = title;
    setTimeout(() => {
    this.audioSource = document.getElementById('audio') as HTMLAudioElement;

      if (this.audioSource) {
          this.audioSource.src = `assets/music/${audioSource}`;
          this.audioSource.play();
          this.isPlaying = true;
      }
    }, 100); // Timeout of 100 milliseconds (adjust as needed)
  }

  public play(): void {
    this.audioSource = document.getElementById('audio') as HTMLAudioElement;
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
