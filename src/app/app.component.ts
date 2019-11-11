import {
  Component,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';

// import { AlertContainerComponent } from "../../src/app/Component/alert-container/alert-container.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  // @ViewChild('demoInput', { read: ElementRef, static: true }) demoInput: ElementRef;
  // @ViewChild(AlertContainerComponent, { static: true }) child: AlertContainerComponent;

  title = 'testAngular';
  ngAfterViewInit() {
    // console.log(' say hello= ' + this.child.sayHello());
    // const ctrl  = this.demoInput.nativeElement;
  }

}
