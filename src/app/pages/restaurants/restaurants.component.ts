import { Component, OnInit } from '@angular/core';
import { Restaurants } from 'src/app/models/restaurants';
import { RestaurantService } from 'src/app/service/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit{

  restaurants = this.service.getRestaurants()

  constructor(public service: RestaurantService){

  }

  ngOnInit(): void {
      
  }

  addRestaurant(name:string, timeToDeliver:string, ratings:string, categories:string){
    this.restaurants.push(new Restaurants(name, Number(timeToDeliver),Number(ratings),categories))
  }
}
