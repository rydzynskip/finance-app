import { Container, Typography } from '@mui/material';
import React from 'react';

import cashLogo from '../public/cash-logo.png';


function Home() {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h2" align="center">
        Budget Tracker
      </Typography>
      <img src={cashLogo} alt={"Cash Logo"} height="215" width="252"/>
      <Typography variant="h5" align="center">
        Plan monthly spending and gain insights on tax and retirement financials.
      </Typography>
    </Container>
  );
}

export default Home;