import React, { useEffect, useState } from 'react';
import Home from '../home/components/home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../home/components/login';
import Welcome from '../home/components/welcome';
import SearchList from '../search/components/searchList';
import ListPage from '../list/components/listPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLinkedinKeys, fetchLoginAuth } from './apiCall';




function App() {

  const [linkedInKeys, setLinkedInKeysRes] = useState({})
  const [loginAuthRes, setLoginAuthRes] = useState({})
  const [userDetails, setUserDetails] = useState({})

  const clientId = '86cilhpcnozw4l';
  const redirectUri = 'http://localhost:3000';
  const scope = 'r_emailaddress,r_liteprofile';

  const navigate = useNavigate();
  const dispatch = useDispatch()


  useEffect(() => {
    const getUrl = window.location.href
    let code = getUrl ? getUrl.split("code=")[1] ? getUrl.split("code=")[1] : "" : ""
    if (code && code !== "" && code !== undefined && code !== null) {
      let obj = {}
      obj.code = code
      fetchLoginAuth(obj, setLoginAuthRes)
    }
    // fetchLinkedinKeys(setLinkedInKeysRes)
  }, []);



  const signUpWithLinkedFunction = () => {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
  }

  useEffect(() => {
    if (loginAuthRes && loginAuthRes !== null && loginAuthRes !== undefined) {
      if (loginAuthRes.status === "success") {
        setUserDetails(loginAuthRes.data)
        navigate("/welcome")
      }
    }
  }, [loginAuthRes])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login signUpWithLinkedFunction={signUpWithLinkedFunction} />} />
        <Route path='/welcome' element={<Welcome userDetails={userDetails} />} />
        <Route path='/search' element={<SearchList />} />
        <Route path='/list' element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default App;
