import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../../service/player.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(public playerService: PlayerService) { }

  ngOnInit(): void {
  }
}
