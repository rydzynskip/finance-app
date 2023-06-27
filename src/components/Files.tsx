import { Container, Typography } from '@mui/material';
import React from 'react';

function File() {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h2" align="center" sx={{ mb: 5 }}>
        Storage View
      </Typography>
      <Typography variant="h5" align="center">
        ... Coming Soon ...
      </Typography>
    </Container>
  );
}

export default File;