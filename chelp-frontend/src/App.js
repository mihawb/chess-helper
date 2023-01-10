import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import ChessboardPage from './ChessboardPage';

function App() {
  const [fenFromPhoto, setFenFromPhoto] = useState([]);
  // for now uses moves array from /upload => to be changed to fen string
  // will require backend changes but front needs refactoring first

  return <>
    <Routes>
      <Route index element={<MainPage setFen={setFenFromPhoto}/>}/>
      <Route path='/chessboard' element={<ChessboardPage fen/>}/>
    </Routes>
  </>
}
export default App;
