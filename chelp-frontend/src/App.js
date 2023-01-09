import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage';
import { Route, Routes } from 'react-router-dom';
import ChessboardPage from './ChessboardPage';

function App() {
  

  return <>
    <Routes>
      <Route index element={<MainPage/>}/>
      <Route path='/chessboard' element={<ChessboardPage/>}/>
    </Routes>
  </>
}
export default App;
