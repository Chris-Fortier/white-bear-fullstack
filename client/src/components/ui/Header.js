import React from "react";
import appLogo from "../../icons/logo-app.svg";
import { Link } from "react-router-dom"; // a React element for linking
import { connect } from "react-redux";
import actions from "../../store/actions";

class Header extends React.Component {
   logOutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   }

   render() {
      return (
         <div>
            {" "}
            {/* <!-- Header Starts Here --> */}
            <img src={appLogo} width="32px;" alt="White Bear Logo" />
            <h3 className="d-inline text-brand ml-1">White Bear</h3>
            <Link
               to="/"
               className="btn btn-link float-right btn-navigation"
               onClick={() => this.logOutCurrentUser()}
            >
               Log Out
            </Link>
         </div>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {
      // put all the things in state we need access to in this component
   };
}

export default connect(mapStateToProps)(Header); // this is "currying"
