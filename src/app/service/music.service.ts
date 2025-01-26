import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private musicUrl = 'assets/music.json';

  constructor(private http: HttpClient) {}

  getMusicList(): Observable<any[]> {
    return this.http.get<any[]>(this.musicUrl);
  }
}
