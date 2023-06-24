import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Data from './components/Data';
import File from './components/Files';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/data" element={<Data /> }/>
        <Route path="/file" element={<File /> }/>
      </Routes>
    </div>
  );
}

export default App;