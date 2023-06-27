import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import React from 'react';

import { DerivedRetirement401K, Retirement401K } from "../../data"
import { formatCash } from '../../utils';


function Retirement(props: { retirement401K: Retirement401K; derivedRetirement401K: DerivedRetirement401K;}) {
  return (
    <Container maxWidth="sm" >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Retirement
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="Retirement Table">
          <TableBody>
            <TableRow>
              <TableCell>Annual Contributions</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.contributionAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Company Matching Contributions</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.matchingAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Contributions</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.totalAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax Reduction</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.taxReduction)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Years</TableCell>
              <TableCell align="right">{props.derivedRetirement401K.years}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Retirement Value (Assuming 10% interest)</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.finalValue)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Value of Year One Contribution</TableCell>
              <TableCell align="right">{formatCash(props.derivedRetirement401K.yearOneValue)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  
  );
}

export default Retirement;