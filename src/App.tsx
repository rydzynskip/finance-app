import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Data from './components/Data';
import File from './components/Files';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#796eff', // purple
    },
    secondary: {
      main: '#fcbd01', // gold
    },
    error: {
      main: '#ff5263', // red
    },
    warning: {
      main: '#ffba00', // orange
    },
    info: {
      main: '#14aaf5', // blue
    },
    success: {
      main: '#66bb6a', // green
    },
    background: {
      default: '#ffffff', // white
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home /> }/>
            <Route path="/data" element={<Data /> }/>
            <Route path="/file" element={<File /> }/>
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;