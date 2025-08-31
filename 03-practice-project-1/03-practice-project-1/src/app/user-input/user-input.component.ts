import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AppService} from "../app.service";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  appService = inject(AppService)

  enterInitailInvestment = signal('0')
  enterAnnualInvestment = signal('0')
  enterExpectedReturn = signal('5')
  enterDuration = signal('10')

  onSubmit() {
    this.appService.onCalculateInvestmentResults({
      initialInvestment: +this.enterInitailInvestment(),
      annualInvestment: +this.enterAnnualInvestment(),
      expectedReturn: +this.enterExpectedReturn(),
      duration: +this.enterDuration()
    })
  }
}
