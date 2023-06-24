import { fv } from "financial";
import data from "./data.json"

export interface BasicInfo {
  salary: number;
}

export interface Retirement401K {
  contributionPercent: number;
  matchingPercent: number;
  retirementAge: number;
  currentAge: number;
}

export type TaxBracket = {
  rate: number;
  maximum?: number; 
}

export interface Taxes {
  federalBrackets: TaxBracket[];
  stateRate: TaxBracket[];
  ssMedicareRate: number;
}

export type Expense = {
  name: string;
  amount: number;
}

export interface Expenses {
  expenses: Expense[];
}

export interface State {
  basicInfo: BasicInfo;
  retirement401K: Retirement401K;
  taxes: Taxes;
  expenses: Expenses;
}


export interface DerivedRetirement401K {
  contributionAmount: number;
  matchingAmount: number;
  totalAmount: number;
  taxReduction: number;
  years: number;
  finalValue: number;
  yearOneValue: number;
}

export interface DerivedBasicInfo {
  grossMonthlySalary: number;
  retirementMonthly: number;
  netMonthlySalary: number;
}

export interface DerivedTaxes {
  taxableIncome: number;
  totalTaxes: number;
  fedMonthlyTax: number;
  effectiveFedRate: number;
  stateMonthlyTax: number;
  ssMedicareMonthlyTax: number;
  totalMonthlyTax: number;
  effectiveTaxRate: number;
}

export interface DerivedExpenses {
  totalExpenses: number;
  finalSurplus: number;
}


export function calculateRetirement401K(basicInfo: BasicInfo, retirement401K: Retirement401K): DerivedRetirement401K {
  const contributionAmount = basicInfo.salary * retirement401K.contributionPercent;
  const matchingAmount = basicInfo.salary * retirement401K.matchingPercent;
  const totalAmount = contributionAmount + matchingAmount;
  const taxReduction = contributionAmount * 0.29; // TODO: Formalize this multiplier
  const years = retirement401K.retirementAge - retirement401K.currentAge;
  const finalValue = Math.abs(fv(0.08, years, totalAmount, 0));
  const yearOneValue = Math.abs(fv(0.08, years, 0, totalAmount));
    
  const derivedRetirement401K: DerivedRetirement401K = {
    contributionAmount,
    matchingAmount,
    totalAmount,
    taxReduction,
    years,
    finalValue,
    yearOneValue
  };

  return derivedRetirement401K;
}

export function calculateBasicInfo(basicInfo: BasicInfo, derivedRetirement401K: DerivedRetirement401K): DerivedBasicInfo {
  const grossMonthlySalary = basicInfo.salary / 12;
  const retirementMonthly = derivedRetirement401K.contributionAmount / 12;
  const netMonthlySalary = grossMonthlySalary - retirementMonthly;

  const derivedBasicInfo: DerivedBasicInfo = {
    grossMonthlySalary,
    retirementMonthly,
    netMonthlySalary
  };

  return derivedBasicInfo;
}

export function calculateTaxes(basicInfo: BasicInfo, taxes: Taxes, derivedRetirement401K: DerivedRetirement401K, derivedBasicInfo: DerivedBasicInfo): DerivedTaxes {
  const taxableIncome = basicInfo.salary - derivedRetirement401K.contributionAmount;
  const totalTaxes = findTaxableIncome(taxes.federalBrackets, taxableIncome);
  const fedMonthlyTax = totalTaxes / 12;
  const effectiveFedRate = totalTaxes / taxableIncome;
  const stateMonthlyTax = findTaxableIncome(taxes.stateRate, derivedBasicInfo.netMonthlySalary);
  const ssMedicareMonthlyTax = taxes.ssMedicareRate * derivedBasicInfo.grossMonthlySalary;
  const totalMonthlyTax = fedMonthlyTax + stateMonthlyTax + ssMedicareMonthlyTax;
  const effectiveTaxRate = totalMonthlyTax / derivedBasicInfo.grossMonthlySalary;

  const derivedTaxes: DerivedTaxes = {
    taxableIncome,
    totalTaxes,
    fedMonthlyTax,
    effectiveFedRate,
    stateMonthlyTax,
    ssMedicareMonthlyTax,
    totalMonthlyTax,
    effectiveTaxRate,
  };

  return derivedTaxes;
}

export function calculateExpenses(expenses: Expenses, derivedBasicInfo: DerivedBasicInfo, derivedTaxes: DerivedTaxes): DerivedExpenses {
  let totalExpenses = 0;
  for (let i = 0; i < expenses.expenses.length; i++) {
    totalExpenses += expenses.expenses[i].amount;
  }
  const finalSurplus = derivedBasicInfo.netMonthlySalary - derivedTaxes.totalMonthlyTax - totalExpenses;

  const derivedExpenses: DerivedExpenses = {
    totalExpenses,
    finalSurplus
  };

  return derivedExpenses;
}


// TODO: Add more complexity for deductions and others
function findTaxableIncome(brackets: TaxBracket[], income: number) {
  let totalTaxes = 0;
  let remainingIncome = income;

  // handle first tax bracket
  if (brackets[0].maximum) {
    if (remainingIncome > brackets[0].maximum) {
      totalTaxes += brackets[0].maximum * brackets[0].rate;
      remainingIncome -= brackets[0].maximum;
    } else {
      return remainingIncome * brackets[0].rate; // fall entirely in first bracket
    }
  } else {
    return income * brackets[0].rate; // fixed tax rate
  }
  
  // handle remaining brackets
  for (let i = 1; i < brackets.length; i++) {
    if (brackets[i].maximum) {
      let maxBracketTaxable = (brackets[i].maximum || 0) - (brackets[i-1].maximum || 0);
      if (remainingIncome > maxBracketTaxable) {
        totalTaxes += maxBracketTaxable * brackets[i].rate;
        remainingIncome -= maxBracketTaxable;
      } else {
        totalTaxes += remainingIncome * brackets[i].rate;
        break;
      }
    } else {
      totalTaxes += remainingIncome * brackets[i].rate; // final bracket
    }
  }

  return totalTaxes;
}


export default function loadData(): State {
  const basicInfo: BasicInfo = { 
   salary: data.salary
 };

 const retirement401K: Retirement401K = { 
   contributionPercent: data.retirement['401k-contribution'],
   matchingPercent: data.retirement['401k-company-match'],
   retirementAge: data.retirement['retirement-age'],
   currentAge: data.retirement['current-age']
 };

 const federalBrackets: TaxBracket[] = data.taxes["federal-brackets"];
 const taxes: Taxes = { 
   federalBrackets: federalBrackets,
   stateRate: data.taxes["state-brackets"],
   ssMedicareRate: data.taxes["social-security-and-medicare"]
 };

 const expenses: Expenses = { expenses: [] };
 expenses.expenses = data.expenses;

 const state: State = {
   basicInfo: basicInfo,
   retirement401K: retirement401K,
   taxes: taxes,
   expenses: expenses
 };

 return state;
}