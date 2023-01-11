import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ChessboardPage from './ChessboardPage';

function App() {
  const [fen, setFen] = useState('');
  const [pov, setPov] = useState(false);

  return <>
    <Routes>
      <Route index element={<MainPage setFen={setFen} setPov={setPov}/>}/>
      <Route path='/chessboard' element={<ChessboardPage pov={pov} fen={fen} setFen={setFen}/>}/>
    </Routes>
  </>
}
export default App;
