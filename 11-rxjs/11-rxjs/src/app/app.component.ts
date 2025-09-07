import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0)
  private destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      console.log(`Click button ${this.clickCount()} times`)
    });
  }

  ngOnInit(): void {
    // const intervalDes = interval(1000).pipe(
    //   map((val) => val * 2)
    // ).subscribe(console.log)
    // this.destroyRef.onDestroy(() => intervalDes.unsubscribe())
  }

  onClick() {
    this.clickCount.update(prev => prev + 1)
  }
}
