import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['./share-popup.component.css']
})
export class SharePopupComponent implements OnInit {
  @Input() songTitle!: string;
  url: string = "";
  // @ts-ignore
  @Output() dataEmitter = new EventEmitter<boolean>();

  sendData() {
    this.dataEmitter.emit(false);
  }

  constructor() { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl(): void{
    this.songTitle = this.songTitle.replaceAll('(', '%28');
    this.songTitle = this.songTitle.replaceAll(')', '%29');
    this.songTitle = this.songTitle.replaceAll(' ', '%20');
    this.url = `${window.location.origin}/music-collection/${this.songTitle}`;
  }

}
