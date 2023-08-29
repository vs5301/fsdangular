import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecyclehooks',
  templateUrl: './lifecyclehooks.component.html',
  styleUrls: ['./lifecyclehooks.component.css']
})
export class LifecyclehooksComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, DoCheck{

  @Input() quoteVariable = ""

  validTill = new Date(2022, 11, 31)
  amount = 2000

  constructor(){
    console.log("[LifecycleHooksComponent] - Constructor"); 
  }
  ngOnInit(): void {
    console.log("[LifecycleHooksComponent] - OnInit"); 
  }
  ngOnDestroy(): void {
    console.log("[LifecycleHooksComponent] - onDestroy");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("[LifecycleHooksComponent] - onChanges");
  }
  ngAfterContentInit(): void {
    console.log("[LifecycleHooksComponent] - AfterContentInit");
  }
  ngAfterContentChecked(): void {
    console.log("[LifecycleHooksComponent] - AfterContentChecked");
  }
  ngAfterViewInit(): void {
    console.log("[LifecycleHooksComponent] - AfterViewInit");
  }
  ngAfterViewChecked(): void {
    console.log("[LifecycleHooksComponent] - AfterViewChecked");
  }
  ngDoCheck(): void {
    console.log("[LifecycleHooksComponent] - DoCheck");
  }

}
