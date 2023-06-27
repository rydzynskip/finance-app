import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Data from './components/Data';
import File from './components/Files';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/data" element={<Data /> }/>
          <Route path="/file" element={<File /> }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;