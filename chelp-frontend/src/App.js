import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ChessboardPage from './ChessboardPage';

function App() {
  const [fen, setFen] = useState('');
  // for now uses stub (image.name) from /upload => to be changed to fen string

  return <>
    <Routes>
      <Route index element={<MainPage setFen={setFen}/>}/>
      <Route path='/chessboard' element={<ChessboardPage fen={fen} setFen={setFen}/>}/>
    </Routes>
  </>
}
export default App;
