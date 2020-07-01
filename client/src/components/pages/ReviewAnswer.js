import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg"; // thumbs up icon
import AppTemplate from "../ui/AppTemplate";
import { connect } from "react-redux";
import actions from "../../store/actions";
// import EditButton from "../ui/EditButton";
import { Link } from "react-router-dom"; // a React element for linking

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      // if we get to this page and have no cards, go to out of cards page
      // or if the index is greater than cards.length-1?
      // if (this.props.queue.cards.length === 0) {
      //    this.props.history.push("/review-empty");
      // }

      // if the card index is greater than the amount of cards, go to out of cards page
      if (props.queue.index >= props.queue.cards.length) {
         this.props.history.push("/review-empty");
      }
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         // if its the last card, go to out of cards and reset the queue
         console.log("We are out of cards");
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         // this.props.dispatch({ type: actions.RESET_QUEUE }); // reset the queue
         this.props.history.push("/review-empty"); // goes to out of cards view
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-imagery"); // goes to review imagery of next card
      }
   }

   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      const memoryCard = this.props.queue.cards[this.props.queue.index]; // gets the current card
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index]; // gets the current card
      return (
         <AppTemplate>
            {/* <!-- Header ends here --> */}

            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div className="card-body">
                     {memoryCard && memoryCard.answer}
                  </div>
               </div>
            </div>

            {/* <!-- button row --> */}

            <div className="row mb-4">
               <div className="col">
                  {/* <EditButton
                     cssClasses="btn btn-link"
                     onClick={() => {
                        this.storeEditableCard();
                     }}
                     hasIcon={false}
                  /> */}
                  <Link
                     to="/edit"
                     className="btn btn-link"
                     onClick={() => {
                        this.storeEditableCard();
                     }}
                  >
                     Edit
                  </Link>
                  <div className="float-right">
                     <button
                        className="btn btn-outline-primary mr-4"
                        onClick={() => {
                           this.goToNextCard();
                        }}
                     >
                        Needs work
                     </button>
                     <button
                        className="btn btn-primary"
                        onClick={() => {
                           this.goToNextCard();
                        }}
                     >
                        <img
                           src={thumbsUpIcon}
                           width="20px"
                           style={{
                              marginBottom: "5px",
                              marginRight: "8px",
                           }}
                           alt=""
                        />
                        {/* use alt="" for decorative images */}
                        {/* converting this html to JSX:
                           style="margin-bottom: 5px; margin-right: 8px;"
                           style={{marginBottom: "5px", marginRight: "8px",}}
                           */}
                        Got it
                     </button>
                  </div>
               </div>
            </div>

            {/* <!-- end button row --> */}
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

export default connect(mapStateToProps)(ReviewAnswer); // this is "currying"
