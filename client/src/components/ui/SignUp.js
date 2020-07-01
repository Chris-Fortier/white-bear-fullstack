import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom"; // a React element for linking
import { EMAIL_REGEX } from "../../utils/helpers";
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

   // tests if the email is valid
   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (!EMAIL_REGEX.test(lowerCasedEmailInput)) {
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   // tests if the local part of the email is inside the password
   checkHasLocalPart(passwordInput, emailInput) {
      if (emailInput.length < 4) {
         return false;
      } else {
         const localPart = emailInput.split("@")[0];
         return passwordInput.includes(localPart);
      }
   }

   // checks if the password is valid
   async setPasswordState(passwordInput, emailInput) {
      console.log("setPasswordState()...");

      const uniqChars = [...new Set(passwordInput)];
      console.log("uniqChars", uniqChars);

      if (passwordInput === "") {
         // check if password input is blank
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         // check if password is less than 9 characters
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         // check if the local part of email is in the password
         this.setState({
            passwordError: "Your password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         // check if the password has less than 3 unique characters
         this.setState({
            passwordError:
               "Your password must have at least three unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   // tests if the email and password are valid and if so creates the user
   async validateAndCreateUser() {
      const emailInput = document.getElementById("singup-email-input").value;
      const passwordInput = document.getElementById("singup-password-input")
         .value;
      console.log(emailInput, passwordInput);

      // await is used on these to make sure we get the states of these before the if statement
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);

      if (!this.state.hasEmailError && !this.state.hasPasswordError) {
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdAt: Date.now(),
         };
         console.log("created user object for POST: ", user);

         // Mimic API response:
         axios
            .get(
               "https://raw.githubusercontent.com/Chris-Fortier/white-bear-mpa/master/src/mock-data/user.json"
            )
            .then((res) => {
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               console.log(error);
            });
         // redirect the user
         this.props.history.push("/create-answer");
      }
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
