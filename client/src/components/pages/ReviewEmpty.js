import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewEmpty extends React.Component {
   // go to previous card
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <h4>Out of cards</h4>

            {/* <!-- button row --> */}

            <div className="row mb-4">
               <div className="col">
                  {this.props.queue.index > 0 && (
                     <button
                        className="btn btn-link"
                        onClick={() => {
                           this.goToPrevCard();
                        }}
                     >
                        Previous card
                     </button>
                  )}
                  <div className="float-right">
                     <button
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => {
                           this.getMoreCards();
                        }}
                     >
                        Get more cards
                     </button>
                  </div>
               </div>
            </div>

            {/* <!-- end button row -->          */}
         </AppTemplate>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewEmpty); // this is "currying"
