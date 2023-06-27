import { Box, Collapse, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

import { DerivedExpenses, Expenses } from "../../data"
import { formatCash } from '../../utils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function ExpensesView(props: { expenses: Expenses; derivedExpenses: DerivedExpenses }) {
  const [expensesOpen, setExpensesOpen] = React.useState(false);

  return (
    <Container maxWidth="sm" >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Expenses
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="Expenses Table">
          <TableBody>
            <TableRow>
              <TableCell>Total Expenses</TableCell>
              <TableCell align="right">
                {formatCash(props.derivedExpenses.totalExpenses)}
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setExpensesOpen(!expensesOpen)}
                >
                  {expensesOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={expensesOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {props.expenses.map((expense, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {expense.name}
                            </TableCell>
                            <TableCell align="right">
                              {formatCash(expense.amount)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Final Monthly Surplus</TableCell>
              <TableCell align="right">{formatCash(props.derivedExpenses.finalSurplus)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ExpensesView;