import {AfterViewInit, Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  host: {
    id: 'status'
  }
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline')

  // private interval?: ReturnType<typeof setInterval>
  private destroyRef = inject(DestroyRef)

  constructor() {
    // effect(() => {
    //   console.log('currentSate:', this.currentStatus())
    // })
  }

  ngOnInit() {
    console.log('ONINIT')
    const interval = setInterval(() => {
      const rnd = Math.random()
      if (rnd < 0.5) {
        this.currentStatus.set('online')
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline')
      } else {
        this.currentStatus.set('unknown')
      }
    }, 2000)

    this.destroyRef.onDestroy(() => {
      clearInterval(interval)
    })
  }

  // ngOnDestroy() {
  //   clearTimeout(this.interval)
  // }
}
