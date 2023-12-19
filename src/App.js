import './App.css';
import React, { useState } from "react";
import { Routes,  Route, useNavigate } from "react-router-dom";
import FeatureHome from "./FeatureHome";
import FirstFactorAuth from "./Login/FirstFactorAuth";
import SecondFactorAuth from "./Login/SecondFactorAuth";
import LandingPage from "./Pages/LandingPage"
import AuthGuard from './AuthGuard';


function App() {
  const [username, setUsername] = useState("");
  //const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const handleFirstFactorSuccess = (authenticatedUsername) => {
    setUsername(authenticatedUsername);
    navigate('/second-factor');
  };

  const handleSecondFactorSuccess = (authenticatedToken) => {
    //setToken(authenticatedToken);
    navigate("/featurehome");
  };
 

  return (
    <>
    
        
        <Routes>


          <Route path="/" element={<LandingPage />} />
          <Route path="/first-factor" element={<FirstFactorAuth onSuccess={handleFirstFactorSuccess}/>} />
          <Route path="/second-factor" element={<SecondFactorAuth username={username} onSuccess={handleSecondFactorSuccess}/>} />

          <Route path="/featurehome/*" element={<AuthGuard><FeatureHome/></AuthGuard>} />
         
        </Routes>
       
      
    </>
  );
}

export default App;
