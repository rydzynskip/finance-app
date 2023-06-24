import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

function Header() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/data">Data</Link>
        <Link to="/file">File</Link>
      </nav>
    </div>
  );
}

export default Header;