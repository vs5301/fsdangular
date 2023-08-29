import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fsdangular';
  show = true
  quote = "Be Exceptional"

  changeQuote(){
    this.quote = "Work Hard"
  }
}
