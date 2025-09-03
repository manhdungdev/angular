import {Directive, effect, ElementRef, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "./auth.service";
import {LogDirective} from "../log.directive";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required({alias: 'appAuth'})
  private authService = inject(AuthService)
  private templateRef = inject(TemplateRef)
  private viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
        this.viewContainerRef.clear()
      }
    });
  }
}
