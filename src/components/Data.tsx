import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';

import loadData, { BasicInfo, calculateBasicInfo, calculateExpenses, calculateRetirement401K, calculateTaxes, Expenses, Retirement401K, State, Taxes } from "../data"
import ExpensesView from './data.views/Expenses';
import RetirementView from './data.views/Retirement';
import TaxesView from './data.views/Taxes';

import Parameters from './Parameters';

function Data() {
	const state: State = loadData();
	
	const [saved, setSaved] = useState<boolean>(true);
	
	const [basicInfo, setBasicInfo] = useState<BasicInfo>(state.basicInfo);
	const [retirement401K, setRetirement401K] = useState<Retirement401K>(state.retirement401K);
	const [taxes, setTaxes] = useState<Taxes>(state.taxes);
	const [expenses, setExpenses] = useState<Expenses>(state.expenses);

	const derivedRetirement401K = useMemo(() => calculateRetirement401K(basicInfo, retirement401K), [basicInfo, retirement401K]);
	const derivedBasicInfo = useMemo(() => calculateBasicInfo(basicInfo, derivedRetirement401K), [basicInfo, derivedRetirement401K]);
	const derivedTaxes = useMemo(() => calculateTaxes(basicInfo, taxes, derivedRetirement401K, derivedBasicInfo), [basicInfo, taxes, derivedRetirement401K, derivedBasicInfo]);
	const derivedExpenses = useMemo(() => calculateExpenses(expenses, derivedBasicInfo, derivedTaxes), [expenses, derivedBasicInfo, derivedTaxes]);

	function fieldsChanged(e: any) {
		e.preventDefault();
		setSaved(false);
	}

	function save() {
		console.log("Saving...");
		console.log(basicInfo);
		console.log(retirement401K);
		console.log(taxes);
		console.log(expenses);
		setSaved(true);
 	}

	async function handleInputChange(input: string, value: number) {
		console.log('Changing ' + input + ' to ' + value);
	}

	return (
		<div>
			<Grid container spacing={2} sx={{ mt: 2 }}>
				<Grid item xs={12} lg={6}>
					<Container maxWidth="sm">
						<Typography variant="h3" align="center" sx={{ mt: 3, mb: 3 }}>
							Information
						</Typography>
						<Parameters 
							basicInfo={basicInfo} 
							setBasicInfo={setBasicInfo} 
							retirement401K={retirement401K} 
							setRetirement401K={setRetirement401K} 
							taxes={taxes} 
							setTaxes={setTaxes}
							expenses={expenses}
							setExpenses={setExpenses}
							fieldsChanged={fieldsChanged} 
							save={save} 
						/>
						{!saved &&
							<Button 
								variant="contained" 
								color="success" 
								onClick={save} 
								fullWidth
								sx={{ mt: 3, color: "white" }}
							>
								Save Changes
							</Button>
						}
					</Container>
				</Grid>
				<Grid item xs={12} lg={6}>
					<Container maxWidth="sm">
						<Typography variant="h3" align="center" sx={{ mt: 3, mb: 3 }}>
							Results
						</Typography>
						<RetirementView retirement401K={retirement401K} derivedRetirement401K={derivedRetirement401K} />
						<TaxesView taxes={taxes} derivedTaxes={derivedTaxes} />
						<ExpensesView expenses={expenses} derivedExpenses={derivedExpenses} />
					</Container>
				</Grid>
			</Grid>
		</div>
	);
}
export default Data;