import {Injectable, signal} from "@angular/core";
import {InvestmentResult} from "./investment-results/investment-results.model";
import {Investment} from "./user-input/user-input.model";

@Injectable({
  providedIn: 'root'
})
export class AppService{
  investmentResults = signal<InvestmentResult[] | undefined>(undefined)
  onCalculateInvestmentResults(data: Investment) {
    const {
      initialInvestment, duration, expectedReturn,
      annualInvestment
    } = data
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.investmentResults.set(annualData)
  }
}
