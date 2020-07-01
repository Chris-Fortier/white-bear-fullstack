import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom"; // a React element for linking
import classnames from "classnames";
import { MAX_CARD_CHARS } from "../../utils/helpers"; // use {} if its not importing the default export
import Counter from "../ui/Counter";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: "",
      };
   }

   checkHasInvalidCharacterCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else {
         return false;
      }
   }

   // updates the state based on user edits to the input
   setAnswerText(e) {
      this.setState({ answerText: e.target.value }); // sets the state to match the user input (value of the event)
      // console.log(e.target, e.target.value);
   }

   render() {
      return (
         <AppTemplate>
            <h4>Add an answer</h4>

            <div className="mb-2">
               <div className="card bg-secondary">
                  <div className="card-body">
                     <textarea
                        rows="6"
                        className="d-sm-block"
                        defaultValue={""}
                        onChange={(e) => this.setAnswerText(e)}
                     ></textarea>
                  </div>
               </div>
            </div>

            <div className="float-right mb-5">
               <p id="counter">
                  <Counter
                     count={this.state.answerText.length}
                     max={MAX_CARD_CHARS}
                  />
               </p>
            </div>
            <div className="clearfix"></div>

            {/* <!-- button row --> */}
            <div className="row mb-4">
               <div className="col">
                  <div className="float-right">
                     <Link
                        className={classnames(
                           "btn btn-primary btn-lg float-right",
                           { disabled: this.checkHasInvalidCharacterCount() }
                        )}
                        to="/create-imagery"
                     >
                        Next
                     </Link>
                  </div>
               </div>
            </div>
            {/* <!-- end button row -->     */}
         </AppTemplate>
      );
   }
}
