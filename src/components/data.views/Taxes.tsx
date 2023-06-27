import { Box, Collapse, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

import { DerivedTaxes, Taxes } from "../../data"
import { formatCash, formatPercentage } from '../../utils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


function Taxes(props: { taxes: Taxes; derivedTaxes: DerivedTaxes }) {
  const [fedBracketOpen, setFedBracketOpen] = React.useState(false);
  const [monthlyTaxOpen, setMonthlyTaxOpen] = React.useState(false);

  return (
    <Container maxWidth="sm" >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Taxes
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="Taxes Table">
          <TableBody>
            <TableRow>
              <TableCell>Federal Tax Brackets</TableCell>
              <TableCell align="right">
                {formatPercentage(props.derivedTaxes.effectiveFedRate)}
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setFedBracketOpen(!fedBracketOpen)}
                >
                  {fedBracketOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={fedBracketOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Tax Rate</TableCell>
                          <TableCell align="right">Bracket Maximum</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {props.taxes.federalBrackets.map((bracket, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {formatPercentage(bracket.rate)}
                            </TableCell>
                            <TableCell align="right">
                              {bracket.maximum ? (` ${formatCash(bracket.maximum)}`) : (`+`)}
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
              <TableCell>State Tax Rate</TableCell> {/* TODO Make this a bracket dropdown also */ }
              <TableCell align="right">{formatPercentage((props.taxes.stateRate.at(0)?.rate) || 0)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Social Security and Medicare Rate</TableCell>
              <TableCell align="right">{formatPercentage(props.taxes.ssMedicareRate)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxable Income</TableCell>
              <TableCell align="right">{formatCash(props.derivedTaxes.taxableIncome)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Taxes</TableCell>
              <TableCell align="right">{formatCash(props.derivedTaxes.totalTaxes)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total Monthly Taxes</TableCell>
              <TableCell align="right">
                {formatCash(props.derivedTaxes.totalMonthlyTax)}
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setMonthlyTaxOpen(!monthlyTaxOpen)}
                >
                  {monthlyTaxOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={monthlyTaxOpen} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Federal
                          </TableCell>
                          <TableCell align="right">
                          {formatCash(props.derivedTaxes.fedMonthlyTax)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            State
                          </TableCell>
                          <TableCell align="right">
                          {formatCash(props.derivedTaxes.stateMonthlyTax)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            SS/Medicare
                          </TableCell>
                          <TableCell align="right">
                          {formatCash(props.derivedTaxes.ssMedicareMonthlyTax)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total Effective Tax Rate</TableCell>
              <TableCell align="right">{formatPercentage(props.derivedTaxes.effectiveTaxRate)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Taxes;