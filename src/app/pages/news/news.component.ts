import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{

  webServicePoint = "https://newsapi.org/v2/top-headlines?country=in&apiKey=4c84650c829d4d2b8aff4d8bdcd0cbd5"

  constructor(
    private http: HttpClient
  ){
    this.http.get(this.webServicePoint).subscribe((response) => {
      console.log(response);
    })
  }

  ngOnInit(): void {
      
  }

}
