import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css']
})
export class MusicDetailComponent implements OnInit {

  constructor(readonly playerService: PlayerService) { }

  ngOnInit(): void {
  }

}
