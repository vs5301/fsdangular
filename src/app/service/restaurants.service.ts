import { Injectable } from '@angular/core';
import { Restaurants } from '../models/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  restaurants: Restaurants[] = [
    new Restaurants("A",30,4.3,"indian"),
    new Restaurants("B",29,4.5,"french"),
    new Restaurants("C",35,4.7,"italian"),
  ]

  constructor() { }

  getRestaurants(){
    return this.restaurants
  }
}
