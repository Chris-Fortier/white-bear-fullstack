import React from "react";
import landingLogo from "../../img/logo-landing.png"; // thumbs up icon
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container landing-page">
            {/* <!-- logo and title --> */}
            <div className="row mb-8 pt-7">
               {/* <!-- logo for larger sizes --> */}
               <div className="d-none d-md-block offset-sm-1 col-sm-11 offset-md-1 col-md-11 offset-lg-1 col-lg-11 offset-xl-1 col-xl-11">
                  <img src={landingLogo} alt="White Bear Logo" />
                  <h1 className="d-inline text-brand">White Bear</h1>
               </div>

               {/* <!-- logo for small sizes --> */}
               <div className="d-md-none offset-1">
                  <img
                     src={landingLogo}
                     alt="White Bear Logo"
                     className="small-title"
                  />
                  <h1 className="d-inline text-brand small-title">
                     White Bear
                  </h1>
               </div>
            </div>

            {/* <!-- cards --> */}
            <div className="row">
               <div className="offset-1 col-10 offset-sm-2 col-sm-8 offset-md-1 col-md-5 offset-lg-1 col-lg-4 offset-xl-1 col-xl-4">
                  <SignUp />
               </div>
               <div className="offset-1 col-10 offset-sm-2 col-sm-8 offset-md-0 col-md-5 offset-lg-1 col-lg-4 offset-xl-2 col-xl-4">
                  <LogIn />
               </div>
            </div>
         </div>
      </div>
   );
}
