import {Component, inject} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {AppService} from "../app.service";

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private appService = inject(AppService)
  get results() {
    return this.appService.investmentResults.asReadonly()
  }
}
