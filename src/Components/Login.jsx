import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

export default function LoginPage() {



  return (
    <>
    <Navbar/>
    <section class="vh-100" style={{backgroundColor : "orange"}}>
      <div class="container py-5 h-100" >
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong" style={{borderRadius : "1rem", backgroundColor : "lightgrey"}}>
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Login</h3>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    placeholder="Email"
                    class="form-control form-control-lg"
                  />                  
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    placeholder="Password"
                    class="form-control form-control-lg"
                  />                  
                </div>
                <Link to="/userhome">
                <button class="btn btn-primary btn-lg btn-block" type="submit" >
                  Login
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
