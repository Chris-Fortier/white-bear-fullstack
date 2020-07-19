import React from "react";
import saveIcon from "../../icons/save.svg"; // thumbs up icon
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom"; // a React element for linking
import classnames from "classnames";
import { MAX_CARD_CHARS } from "../../utils/helpers"; // use {} if its not importing the default export
import Counter from "../ui/Counter";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";

class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         imageryText: this.props.creatableCard.answer,
      };
   }

   checkHasInvalidCharacterCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else {
         return false;
      }
   }

   // updates the state based on user edits to the input
   setImageryText(e) {
      this.setState({ imageryText: e.target.value }); // sets the state to match the user input (value of the event)
      // console.log(e.target, e.target.value);
   }

   async updateCreatableCard() {
      console.log("updating creatable card");
      const updatedCreatableCard = { ...this.props.creatableCard };
      updatedCreatableCard.imagery = this.state.imageryText;

      // wait for this action to be dispatched
      await this.props.dispatch({
         type: actions.UPDATE_CREATABLE_CARD,
         payload: updatedCreatableCard,
      });
      // then save to the database (make an API call)
      axios
         .post("/api/v1/memory-cards", this.props.creatableCard)
         .then((res) => {
            console.log("memory card created");
            // display success overlay
            // route to "/create-answer"
            this.props.dispatch({
               type: actions.UPDATE_CREATABLE_CARD,
               payload: {},
            });
            // clear creatableCard from Redux
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            // display error overlay
            // hide error overlay after 5 seconds
            // stay on this page
         });
      // go to create-answer
   }

   render() {
      return (
         <AppTemplate>
            <h4>Add Memorable Imagery</h4>
            <div className="mb-2">
               <div className="card bg-primary">
                  <div className="card-body">
                     <textarea
                        rows="6"
                        className="d-sm-block"
                        defaultValue={""}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea>
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div className="card-body" id="answer-content">
                     {this.props.creatableCard.answer}
                  </div>
               </div>
            </div>
            <div className="float-right mb-5">
               <p>
                  <Counter
                     count={this.state.imageryText.length}
                     max={MAX_CARD_CHARS}
                  />
               </p>
            </div>
            <div className="clearfix"></div>
            <div className="row mb-4">
               <div className="col">
                  <Link
                     to="/create-answer"
                     className="btn btn-link"
                     id="back-to-answer"
                  >
                     Back to answer
                  </Link>
                  <button
                     className={classnames(
                        "btn btn-primary btn-lg float-right",
                        { disabled: this.checkHasInvalidCharacterCount() }
                     )}
                     onClick={() => {
                        this.updateCreatableCard();
                     }}
                  >
                     <img
                        src={saveIcon}
                        width="20px"
                        style={{
                           marginBottom: "3px",
                           marginRight: "8px",
                        }}
                        alt=""
                     />
                     Save
                  </button>
               </div>
            </div>
            {/* <!-- end of buttons --> */}
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      creatableCard: state.creatableCard,
   };
}

export default connect(mapStateToProps)(CreateImagery);
