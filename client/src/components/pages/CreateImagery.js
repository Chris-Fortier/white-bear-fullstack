import React from "react";
import saveIcon from "../../icons/save.svg"; // thumbs up icon
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom"; // a React element for linking
import classnames from "classnames";
import { MAX_CARD_CHARS } from "../../utils/helpers"; // use {} if its not importing the default export
import Counter from "../ui/Counter";

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         imageryText: "",
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
                     Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                     Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                     natoque penatibus et magnis dis parturient montes, nascetur
                     ridiculus mus. Donec quam felis, ultricies nec,
                     pellentesque eu, pretium quis, sem. Nulla consequat massa
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
                  <Link
                     className={classnames(
                        "btn btn-primary btn-lg float-right",
                        { disabled: this.checkHasInvalidCharacterCount() }
                     )}
                     to="/create-answer"
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
                  </Link>
               </div>
            </div>
            {/* <!-- end of buttons --> */}
         </AppTemplate>
      );
   }
}
