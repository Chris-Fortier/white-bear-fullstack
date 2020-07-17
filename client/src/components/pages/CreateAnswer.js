import React from "react";
import AppTemplate from "../ui/AppTemplate";
import classnames from "classnames";
import { MAX_CARD_CHARS, defaultLevel } from "../../utils/helpers"; // use {} if its not importing the default export
import Counter from "../ui/Counter";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { v4 as getUuid } from "uuid";
import getNextAttemptAt from "../../utils/getNextAttemptAt";

class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: this.props.creatableCard.answer || "",
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

   setCreatableCard() {
      console.log("UPDATE_CREATABLE_CARD");
      const currentTime = Date.now();
      this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: {
            // the card itself
            id: getUuid(),
            answer: this.state.answerText,
            imagery: "",
            userId: this.props.currentUser.id,
            createdAt: currentTime,
            nextAttemptAt: getNextAttemptAt(defaultLevel, currentTime), //
            lastAttemptAt: currentTime,
            totalSuccessfullAttempts: 0,
            level: 1,
         },
      });
      this.props.history.push("/create-imagery");
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
                        defaultValue={this.state.answerText}
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
                     <button
                        className={classnames(
                           "btn btn-primary btn-lg float-right",
                           { disabled: this.checkHasInvalidCharacterCount() }
                        )}
                        onClick={() => {
                           this.setCreatableCard();
                        }}
                     >
                        Next
                     </button>
                  </div>
               </div>
            </div>
            {/* <!-- end button row -->     */}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      currentUser: state.currentUser,
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateAnswer);
