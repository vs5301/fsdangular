import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  email = new FormControl('')

  myProfile: Profile = {
    name: "John Watson",
    about: "I am currently seeking an oppurtunity in Angular",
    email: "john@example.com",
    age: 30,
    gender: "male",
    address: "Redwood Shores"
  }

  message = ""
  data = 10

  constructor(){
    
  }

  ngOnInit(): void {
      
  }

  onButtonClicked(){
    this.message = "This is Changed"
  }

  validate(){
    if (this.email.value == "") {
      this.message = "Email is invalid"
      this.email.setValue("demo@example.com")
    } else {
      this.message = "Email is Valid"      
    }
  }

}
