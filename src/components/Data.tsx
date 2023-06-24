import React, { useMemo, useState } from 'react';

import '../App.css';
import loadData, { BasicInfo, calculateBasicInfo, calculateExpenses, calculateRetirement401K, calculateTaxes, State } from "../data"
import { readFile } from '../file';
import { formatCash, formatPercentage } from '../utils';

function Data() {
	const state: State = loadData();
	readFile();
	const [basicInfo, setBasicInfo] = useState<BasicInfo>(state.basicInfo);
	const [retirement401K, setRetirement401K] = useState(state.retirement401K);
	const [taxes, setTaxes] = useState(state.taxes);
	const [expenses, setExpenses] = useState(state.expenses);

	const derivedRetirement401K = useMemo(() => calculateRetirement401K(basicInfo, retirement401K), [basicInfo, retirement401K]);
	const derivedBasicInfo = useMemo(() => calculateBasicInfo(basicInfo, derivedRetirement401K), [basicInfo, derivedRetirement401K]);
	const derivedTaxes = useMemo(() => calculateTaxes(basicInfo, taxes, derivedRetirement401K, derivedBasicInfo), [basicInfo, taxes, derivedRetirement401K, derivedBasicInfo]);
	const derivedExpenses = useMemo(() => calculateExpenses(expenses, derivedBasicInfo, derivedTaxes), [expenses, derivedBasicInfo, derivedTaxes]);

	const save = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		console.log('Submited');
	}

	async function handleInputChange(input: string, value: number) {
		console.log('Changing ' + input + ' to ' + value);
	}

	return (
		<div>
			<div className="Section">
				<header>
					Basic Info
				</header>
				<form>
					<label>
						Salary:
						<input type="number" name="salary" value={basicInfo.salary} onChange={(e) => setBasicInfo({...basicInfo, salary: e.target.valueAsNumber})}/>
					</label>
				</form>
			</div>

			<div className="Section">
				<header>
					Retirement
				</header>
				<form>
					<label>
						401K Contribution (%):
						<input type="number" name="401k-contribution" value={retirement401K.contributionPercent} onChange={(e) => setRetirement401K({...retirement401K, contributionPercent: e.target.valueAsNumber})}/>
					</label>
					<br></br>
					<label>
						401K Company Match:
						<input type="number" name="401k-company-match" value={retirement401K.matchingPercent} onChange={(e) => setRetirement401K({...retirement401K, matchingPercent: e.target.valueAsNumber})}/>
					</label>
					<br></br>
					<label>
						Current Age:
						<input type="number" name="current-age" value={retirement401K.currentAge} onChange={(e) => setRetirement401K({...retirement401K, currentAge: e.target.valueAsNumber})}/>
					</label>
					<br></br>
					<label>
						Retirement Age:
						<input type="number" name="retirement-age" value={retirement401K.retirementAge} onChange={(e) => setRetirement401K({...retirement401K, retirementAge: e.target.valueAsNumber})}/>
					</label>
				</form>
				<p>Annual Contributions: {formatCash(derivedRetirement401K.contributionAmount)}</p>
				<p>Company Match: {formatCash(derivedRetirement401K.matchingAmount)}</p>
				<p>Total: {formatCash(derivedRetirement401K.totalAmount)}</p>
				<p>Tax Reduction: {formatCash(derivedRetirement401K.taxReduction)}</p>
				<p>Years: {derivedRetirement401K.years} (From age {retirement401K.currentAge} to {retirement401K.retirementAge})</p>
				<p>Retirement Value: {formatCash(derivedRetirement401K.finalValue)}</p>
				<p>Year 1 Value: {formatCash(derivedRetirement401K.yearOneValue)}</p>
			</div>

			<div className="Section">
				<header>
					Tax Info
				</header>
				<p>Federal Tax Brackets:</p>
				<ul>
					{taxes.federalBrackets.map((bracket, index) => {
						return <li key={index}>Bracket {index+1} - {formatPercentage(bracket.rate)} {bracket.maximum ? (`up to ${formatCash(bracket.maximum)}`) : (``)}</li>
					})}
				</ul>
				<p>State Tax Brackets:</p>
				<ul>
					{taxes.stateRate.map((bracket, index) => {
						return <li key={index}>Bracket {index+1} - {formatPercentage(bracket.rate)} {bracket.maximum ? (`up to ${formatCash(bracket.maximum)}`) : (``)}</li>
					})}
				</ul>
				<p>Social Security and Medicare Rate: {formatPercentage(taxes.ssMedicareRate)}</p>
				<p>Taxable Income: {formatCash(derivedTaxes.taxableIncome)}</p>
				<p>Total Taxes: {formatCash(derivedTaxes.totalTaxes)}</p>
				<p>Total Monthly Taxes: {formatCash(derivedTaxes.totalMonthlyTax)}</p>
				<ul>
					<li>Federal: {formatCash(derivedTaxes.fedMonthlyTax)}</li>
					<li>State: {formatCash(derivedTaxes.stateMonthlyTax)}</li>
					<li>SS/Medicare: {formatCash(derivedTaxes.ssMedicareMonthlyTax)}</li>
				</ul>
				<p>Effective Federal Rate: {formatPercentage(derivedTaxes.effectiveFedRate)}</p>
				<p>Effective Total Rate: {formatPercentage(derivedTaxes.effectiveTaxRate)}</p>
			</div>

			<div className="Section">
				<header>
					Expense Info
				</header>
				<form>
					<p>Expenses:</p>
					<ul>
						{expenses.expenses.map((expense, index) => {
							return <li key={index}>{expense.name} - {formatCash(expense.amount)}</li>
						})}
					</ul>
				</form>
				<p>Total Expenses: {formatCash(derivedExpenses.totalExpenses)}</p>
				<p>Final Surplus: {formatCash(derivedExpenses.finalSurplus)}</p>
			</div>
		</div>
	);
}
export default Data;