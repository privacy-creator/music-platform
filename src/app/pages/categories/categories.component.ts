import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    const musicJson = 'assets/music/music.json';

    this.http.get<any[]>(musicJson).subscribe((data) => {
      // Extract unique categories from the songs
      this.categories = [...new Set(data.map(song => song.category))];
    });
  }
}
