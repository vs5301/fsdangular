import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreModule } from '@angular/fire/firestore'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  promoCodeList: any
  // documents: Observable<any[]>
  
  constructor(public firestore: FirestoreModule){
    // this.documents = firestore.collection("promo-codes").valueChanges()
  }

  async fetchPromoCodes(){
    
  }

  ngOnInit(): void {
      
  }
}
