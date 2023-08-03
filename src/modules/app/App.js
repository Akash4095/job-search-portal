import React from 'react';
import Home from '../home/components/home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../home/components/login';
import Welcome from '../home/components/welcome';
import SearchList from '../search/searchList';
import ListPage from '../list/components/listPage';




function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/search' element={<SearchList />} />
        <Route path='/list' element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
