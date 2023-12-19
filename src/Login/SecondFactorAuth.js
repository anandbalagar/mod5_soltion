import React, { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const SecondFactorAuth = ({ username, onSuccess }) => {
  const [otp, setOtp] = useState("");
  //const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSecondFactorAuth = async () => {
    try {
      const response = await axios.post(
        
        "https://usermanagemenfeaturemarketplaceapi.azurewebsites.net/api/Authentication/login-2FA",
        { username: username, code: otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );     
      

      sessionStorage.setItem("token", response.data.token);

      const decodedtoken = parseJwt(response.data.token);

      const {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": name,
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
      } = decodedtoken;
      console.log(decodedtoken);
      const userObject = {
        name,
        role,
      };

      sessionStorage.setItem('UserObj', JSON.stringify(userObject));

      const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
      console.log(storedUserObject.name);

      if (response.data.token && userObject.role === "Users") {
        onSuccess(response.data.token);

        console.log("success");
      } else {
        alert("You are not authorized to access this page");
      }
    } catch (error) {
      console.error("Error during second-factor authentication:", error);
      setErrorMessage("Please Enter Valid OTP");
    }
  };

  function parseJwt(token) {
    //     // ... (your existing code)
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <div>
      <section className="vh-100">
      <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Enter OTP received via Mail</h3>
                  {/* <label>Enter OTP {username}:</label> */}
                  <div className="form-outline mb-4">
                    <input
                      placeholder=" Enter OTP"
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <br />
                  <button
                    className="btn btn-warning btn-lg btn-block"
                    onClick={handleSecondFactorAuth}
                  >
                    Verify
                  </button>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SecondFactorAuth;
