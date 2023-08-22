import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore'
import { PromoCodeList } from 'src/app/classes/promo-code-list';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  promoCodeList: any[] = []
  dummyList!: PromoCodeList;
  
  constructor(
    public firestore: Firestore,
    public dbService: DbService){
  }

  ngOnInit(): void {
    this.getPromoCodeList()
  }

  getPromoCodeList(){
    let codeSub = this.dbService.codeModelSubject.subscribe((value) => {
      if (value.length !== 0) {
        this.promoCodeList = value
        
        this.dbService.getWindowRef().setTimeout(() => codeSub.unsubscribe(), this.dbService.timeoutInterval * 6)
      }
    })
  }

}
