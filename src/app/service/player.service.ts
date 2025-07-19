import {Injectable} from '@angular/core';
import {MusicService} from "./music.service";

interface Song {
    title: string;
    filename: string;
    id: number;
}

interface AudioProgress {
    current: number;
    duration: number;
    percentage: number;
}

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private static readonly AUDIO_ELEMENT_ID = 'audio';
    private static readonly PROGRESS_BAR_ID = 'progress-bar';
    private static readonly CURRENT_TIME_ID = 'current-time';
    private static readonly TOTAL_TIME_ID = 'total-time';
    private static readonly MUSIC_ASSETS_PATH = 'assets/music/';

    private _isPlaying = false;
    private _showPlayer = false;
    private _songPlaying = '';
    private _audioSource: HTMLAudioElement | undefined;
    private _playlist: Song[] = [];
    private _musicList: Song[] = [];
    private _filteredMusic: Song[] = [];
    private _currentSongIndex = 0;

    constructor(private musicService: MusicService) {
        this.musicService.getMusicList().subscribe(data => {
            this._musicList = data;
            this._filteredMusic = data;
        });
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    get showPlayer(): boolean {
        return this._showPlayer;
    }

    set showPlayer(value: boolean) {
        this._showPlayer = value;
    }

    get songPlaying(): string {
        return this._songPlaying;
    }

    get currentSongIndex(): number {
        return this._currentSongIndex;
    }

    setPlaylist(songs: Song[]): void {
        this._playlist = songs;
    }

    changeAudioSource(audioSource: string, title: string, id: number): void {
        this._audioSource = document.getElementById(PlayerService.AUDIO_ELEMENT_ID) as HTMLAudioElement;
        if (this._audioSource) {
            this.setupAudioEventListeners();
            this.updatePlayerState(title, id);
            this.loadAndPlayAudio(audioSource);
        }
    }

    private setupAudioEventListeners(): void {
        if (!this._audioSource) return;

        this._audioSource.addEventListener('ended', () => this.playNext());
        this._audioSource.addEventListener('timeupdate', () => this.updateProgress());
        this._audioSource.addEventListener('play', () => this._isPlaying = true);
        this._audioSource.addEventListener('pause', () => this._isPlaying = false);
    }

    private updatePlayerState(title: string, id: number): void {
        this._showPlayer = true;
        this._songPlaying = title;
        this._currentSongIndex = id;
        document.title = title;
    }

    private loadAndPlayAudio(audioSource: string): void {
        if (!this._audioSource) return;

        this._audioSource.src = `${PlayerService.MUSIC_ASSETS_PATH}${audioSource}`;
        this._audioSource.play();
    }

    play(): void {
        if (!this._audioSource) {
            console.error('Audio element not found');
            return;
        }

        this._audioSource.paused ? this._audioSource.play() : this._audioSource.pause();
    }

    private playCurrentSong(): void {
        const song = this._playlist[this._currentSongIndex];
        if (song) {
            this.changeAudioSource(song.filename, song.title, song.id);
        }
    }

    playNext(): void {
        this._currentSongIndex = (this._currentSongIndex + 1) % this._playlist.length;
        this.playCurrentSong();
    }

    playPrev(): void {
        this._currentSongIndex = this._currentSongIndex - 1 < 0 ?
            this._playlist.length - 1 : this._currentSongIndex - 1;
        this.playCurrentSong();
    }

    updateProgress(): void {
        const progress = this.calculateProgress();
        if (!progress) return;

        this.updateProgressUI(progress);
    }

    private calculateProgress(): AudioProgress | null {
        if (!this._audioSource) return null;

        return {
            current: this._audioSource.currentTime,
            duration: this._audioSource.duration,
            percentage: (this._audioSource.currentTime / this._audioSource.duration) * 100
        };
    }

    private updateProgressUI(progress: AudioProgress): void {
        const progressBar = document.getElementById(PlayerService.PROGRESS_BAR_ID) as HTMLDivElement;
        const currentTime = document.getElementById(PlayerService.CURRENT_TIME_ID);
        const totalTime = document.getElementById(PlayerService.TOTAL_TIME_ID);

        if (progressBar) {
            progressBar.style.width = `${progress.percentage}%`;
        }

        if (!isNaN(progress.current) && !isNaN(progress.duration)) {
            if (currentTime) currentTime.textContent = this.formatTime(progress.current);
            if (totalTime) totalTime.textContent = this.formatTime(progress.duration);
        }
    }

    private formatTime(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }

    updateVolume(event: Event): void {
        if (!this._audioSource) return;

        const inputElement = event.target as HTMLInputElement;
        if (inputElement) {
            this._audioSource.volume = parseFloat(inputElement.value);
        }
    }

    seekAudio(event: MouseEvent): void {
        if (!this._audioSource?.duration) return;

        const progressContainer = event.target as HTMLElement;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const width = progressContainer.offsetWidth;

        this._audioSource.currentTime = (clickX / width) * this._audioSource.duration;
    }
}
