import React from 'react';

import '../App.css';
import cashLogo from '../public/cash-logo.png';

function Home() {
    return (
      <div>
        <h1>Home</h1>
        <img src={cashLogo} alt={"Cash Logo"} height="215" width="252" />
      </div>
    );
  }

export default Home;