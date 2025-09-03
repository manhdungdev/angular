import {Directive, ElementRef, inject, input} from "@angular/core";
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onLeavePage($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
  queryParam = input('my-app', {alias: 'appSafeLink'});
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
  constructor() {
    console.log('SafeLinkDirective is activated!');
  }

  onLeavePage(event: MouseEvent) {
    const isWantToLeave = window.confirm('Do you really want to leave this page?')
    if (isWantToLeave) {
      // (event.target as HTMLAnchorElement).href += `?from=${this.queryParam()}`
      const address = this.hostElement.nativeElement.href
      this.hostElement.nativeElement.href = `${address}?from=${this.queryParam()}`
      return
    }
    event.preventDefault()
  }
}
