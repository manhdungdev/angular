import {Component, ElementRef, HostBinding, HostListener, inject, Input} from '@angular/core';
import {ServerStatusComponent} from "../server-status/server-status.component";

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [
    ServerStatusComponent
  ],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  host: {
    'class': 'dashboard-item',
    '(click)': 'onClick()'
  }
})
export class DashboardItemComponent {
  // @HostBinding('class') className = 'dashboard-item'
  // @HostListener('click') function()
  private el = inject(ElementRef)
  @Input({
    required: true
  }) imageInfo!: {
    src: string
    alt: string
  }

  @Input({required: true}) title!: string

  onClick() {
    console.log(this.el);
  }
}
