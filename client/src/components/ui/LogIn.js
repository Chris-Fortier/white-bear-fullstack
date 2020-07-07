import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom"; // a React element for linking
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   // tests if the email and password are valid and if so creates the user
   async validateAndLogInUser() {
      const emailInput = document.getElementById("email-input").value;
      const passwordInput = document.getElementById("password-input").value;

      const user = {
         email: emailInput,
         password: passwordInput, // send the plain text password over secure connection, the server will hash it
      };
      // call API response:
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // handle success
            // update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            // go to next page
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const data = err.response.data;
            console.log("err.response.data", data);
            const { emailError, passwordError } = data;

            // push email error to state
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }

            // push password error to state
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <div className="card">
            <h2 className="card-title">Welcome back</h2>
            <p>Log in with your email address and password.</p>

            <form className="mb-0 needs-validation" noValidate>
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                     type="email"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasEmailError,
                     })}
                     id="email-input"
                     required
                  />
                  {this.state.hasEmailError && (
                     <div className="text-danger" id="email-error">
                        {this.state.emailError}
                     </div>
                  )}
               </div>
               <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                     type="password"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasPasswordError,
                     })}
                     id="password-input"
                     required
                  />
                  {this.state.hasPasswordError && (
                     <div className="text-danger" id="password-error">
                        {this.state.passwordError}
                     </div>
                  )}
               </div>
               <button
                  className="btn btn-success w-100"
                  id="user-button"
                  type="button"
                  onClick={() => this.validateAndLogInUser()}
               >
                  Log In
               </button>
            </form>
         </div>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(LogIn)); // this is "currying"
