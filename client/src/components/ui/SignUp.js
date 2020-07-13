import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom"; // a React element for linking
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      console.log("In a new class component!");
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   // shows the for for signing up
   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   // tests if the email and password are valid and if so creates the user
   async validateAndCreateUser() {
      const emailInput = document.getElementById("singup-email-input").value;
      const passwordInput = document.getElementById("singup-password-input")
         .value;

      // create user obj
      const user = {
         id: getUuid(), // make a new uuid
         email: emailInput,
         password: passwordInput, // send the plain text password over secure connection, the server will hash it
         createdAt: Date.now(),
      };

      // post to API
      axios
         .post("/api/v1/users", user) // post to this endpoint the user object we just made
         .then((res) => {
            console.log("res.data", res.data);
            // update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });

            // set authorization headers for every request at the moment of log in
            // TODO: add this in once we pass the authToken in our response
            // axios.defaults.headers.common["x-auth-token"] = authToken;

            // go to next page
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const data = err.response.data;
            console.log("err", data);
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

   // renders the signup faceplate
   render() {
      return (
         <div className="card">
            <h2 className="card-title">Nice to meet you</h2>
            <p>Sign up for White Bear. Free forever</p>
            <form
               className="mb-0 needs-validation"
               id="sign-up-form"
               noValidate
            >
               {this.state.isDisplayingInputs && (
                  <>
                     <p className="text-success">Let's get you signed up</p>
                     <div className="form-group">
                        <label htmlFor="exampleInputEmail2">
                           Email address
                        </label>
                        <input
                           type="email"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasEmailError,
                           })}
                           id="singup-email-input"
                           required
                        />
                        {this.state.hasEmailError && (
                           <div className="text-danger" id="email-error">
                              {this.state.emailError}
                           </div>
                        )}
                     </div>
                     <div className="form-group">
                        <label htmlFor="exampleInputPassword2">
                           Create a password
                        </label>
                        <p className="text-muted">
                           Must be at least 9 characters
                        </p>
                        <input
                           type="password"
                           className={classnames({
                              "form-control": true,
                              "is-invalid": this.state.hasPasswordError,
                           })}
                           id="singup-password-input"
                           required
                        />
                        {this.state.hasPasswordError && (
                           <div className="text-danger" id="password-error">
                              {this.state.passwordError}
                           </div>
                        )}
                     </div>
                     <button
                        // to="/create-answer"
                        className="btn btn-success w-100"
                        id="user-button"
                        type="button"
                        onClick={() => this.validateAndCreateUser()}
                     >
                        Let's Go
                     </button>
                  </>
               )}
            </form>
            {!this.state.isDisplayingInputs && (
               <button
                  onClick={() => {
                     this.showInputs();
                  }}
                  className="btn btn-success float-right"
                  id="sign-up-button"
               >
                  Sign up
               </button>
            )}
         </div>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {};
}

export default withRouter(connect(mapStateToProps)(SignUp)); // this is "currying"
