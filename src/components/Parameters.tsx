import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

import { BasicInfo, Expenses, Retirement401K, Taxes } from "../data"

function Parameters(
	props: { 
		basicInfo: BasicInfo; 
		setBasicInfo: any;
		retirement401K: Retirement401K; 
		setRetirement401K: any;
		taxes: Taxes;  
		setTaxes: any;
		expenses: Expenses;
		setExpenses: any;
		fieldsChanged: any; 
		save: any;
	}) {

	function changeSalary(e: any) {
		props.setBasicInfo({...props.basicInfo, salary: e.target.valueAsNumber});
		props.fieldsChanged(e);
	}

	function change401KContribution(e: any) {
		props.setRetirement401K({...props.retirement401K, contributionPercent: e.target.valueAsNumber / 100});
		props.fieldsChanged(e);
	}

	function change401KMatching(e: any) {
		props.setRetirement401K({...props.retirement401K, matchingPercent: e.target.valueAsNumber / 100});
		props.fieldsChanged(e);
	}

	function changeCurrentAge(e: any) {
		props.setRetirement401K({...props.retirement401K, currentAge: e.target.valueAsNumber});
		props.fieldsChanged(e);
	}

	function changeRetirementAge(e: any) {
		props.setRetirement401K({...props.retirement401K, retirementAge: e.target.valueAsNumber});
		props.fieldsChanged(e);
	}

	const handleAddExpense = (event: any) => {
		props.setExpenses([...props.expenses, { name: "", amount: 0 }]);
		props.fieldsChanged(event);
	};

	const handleDeleteExpense = (event: any, index: number) => {
		props.setExpenses(props.expenses.filter((expense, i) => i !== index));
		props.fieldsChanged(event);
	};

	const handleExpenseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
		const newExpenses = [...props.expenses];
		if (event.target.name === 'name') {
		  newExpenses[index].name = event.target.value;
		} else {
		  newExpenses[index].amount = Number(event.target.value);
		}
		props.setExpenses(newExpenses);
		props.fieldsChanged(event);
	};

	return (
		<Container maxWidth="sm" >
			<TextField
				label="Salary"
				type="number"
				variant="outlined"
				required
				fullWidth
				value={props.basicInfo.salary}
				onChange={changeSalary}
				sx={{ width: '100%' }}
			/>
			<form noValidate>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12}>
						<Typography variant="h5" sx={{ mb: 2 }}>
							Retirement
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="401K Contribution (%)"
							type="number"
							variant="outlined"
							required
							fullWidth
							value={props.retirement401K.contributionPercent * 100}
							onChange={change401KContribution}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="401K Matching (%)"
							type="number"
							variant="outlined"
							required
							fullWidth
							value={props.retirement401K.matchingPercent * 100}
							onChange={change401KMatching}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField	
							label="Current Age"
							type="number"
							variant="outlined"
							required
							fullWidth
							value={props.retirement401K.currentAge}
							onChange={changeCurrentAge}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label="Retirement Age"
							type="number"
							variant="outlined"
							required
							fullWidth
							value={props.retirement401K.retirementAge}
							onChange={changeRetirementAge}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<Grid item xs={12}>
						<Typography variant="h5" sx={{ mb: 2 }}>
							Expenses
						</Typography>
					</Grid>
					{props.expenses.map((expense, index) => (
						<React.Fragment key={index}>
							<Grid item xs={12} sm={5}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="name"
									label="Name"
									name="name"
									value={expense.name}
									onChange={(event) => handleExpenseChange(event, index)}
								/>
							</Grid>
							<Grid item xs={12} sm={5}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="amount"
									label="Amount"
									name="amount"
									type="number"
									value={expense.amount}
									onChange={(event) => handleExpenseChange(event, index)}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Button
									variant="contained"
									color="error"
									onClick={(event) => handleDeleteExpense(event, index)}
								>
									Delete
								</Button>
							</Grid>
						</React.Fragment>
					))}
					<Grid item xs={12}>
						<Button 
							type="button"
							variant="contained"
							color="primary"
							onClick={(event) => handleAddExpense(event)}
						>
							Add Expense
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default Parameters;