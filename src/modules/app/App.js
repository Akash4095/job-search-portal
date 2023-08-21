import React, { useEffect, useState } from 'react';
import Home from '../home/components/home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../home/components/login';
import Welcome from '../home/components/welcome';
import SearchList from '../search/components/searchList';
import ListPage from '../list/components/listPage';
import { fetchLinkedinKeys, fetchLoginAuth } from './apiCall';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  const [searchedText, setSearchedText] = useState("");
  const [sessionUserId, setSessionUserId] = useState("");



  return (
    <div>
      <Routes>
        <Route path='/' element={<Login setSessionUserId={setSessionUserId} />} />
        <Route path='/welcome' element={<Welcome setSearchedText={setSearchedText} searchedText={searchedText} sessionUserId={sessionUserId} setSessionUserId={setSessionUserId} />} />
        <Route path='/search' element={<SearchList setSearchedText={setSearchedText} searchedText={searchedText} sessionUserId={sessionUserId} setSessionUserId={setSessionUserId} />} />
        <Route path='/list' element={<ListPage setSearchedText={setSearchedText} searchedText={searchedText} sessionUserId={sessionUserId} setSessionUserId={setSessionUserId} />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        hideProgressBar={false}
      />
    </div>
  );
}

export default App;
