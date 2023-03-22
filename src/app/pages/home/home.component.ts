import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  query: string = "No Data"
  name: string = "No Data"

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.query = params['query']
        this.name = params['name']
      })
  }

}
