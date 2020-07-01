import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom"; // a React element for linking
import memoryCards from "../../mock-data/memory-cards";
import toDisplayData from "date-fns/format";
import classnames from "classnames";
import { MAX_CARD_CHARS } from "../../utils/helpers"; // use {} if its not importing the default export
import Counter from "../ui/Counter";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";

const memoryCard = memoryCards[2];

class Edit extends React.Component {
   constructor(props) {
      super(props);
      console.log("In the edit component");
      this.state = {
         answerText: memoryCard.answer,
         imageryText: memoryCard.imagery,
         hasDeleteButton: false, // stores whether delete button is shown
      };
   }

   checkHasInvalidCharacterCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0 ||
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

   // updates the state based on user edits to the input
   setAnswerText(e) {
      this.setState({ answerText: e.target.value }); // sets the state to match the user input (value of the event)
      // console.log(e.target, e.target.value);
   }

   toggleHasDeleteButton(e) {
      this.setState({ hasDeleteButton: !this.state.hasDeleteButton });
   }

   deleteCard() {
      // TODO: delete from database
      console.log("deleting card");
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromStore() {
      console.log("deleteCardFromStore()...");
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      }); // puts the new array of cards that we deleted the card from in the store
   }

   // if they came from a review answer page, take them to a review imagery page if they delete this card
   changeRoute(prevRoute) {
      if (prevRoute === "/review-answer") {
         return "/review-imagery";
      }
   }

   render() {
      return (
         <AppTemplate>
            <h4>Edit card</h4>

            {!isEmpty(this.props.editableCard) && (
               <>
                  <div className="mb-2">
                     <div className="card bg-primary">
                        <div className="card-body">
                           <textarea
                              rows="6"
                              className="d-sm-block"
                              autoFocus
                              defaultValue={
                                 this.props.editableCard.card.imagery
                              }
                              onChange={(e) => this.setImageryText(e)}
                           ></textarea>
                        </div>
                     </div>
                     <div className="card bg-secondary">
                        <div className="card-body">
                           <textarea
                              rows="6"
                              className="d-sm-block"
                              defaultValue={this.props.editableCard.card.answer}
                              onChange={(e) => this.setAnswerText(e)}
                           ></textarea>
                        </div>
                     </div>
                  </div>

                  <div className="float-right mb-5 text-muted">
                     <p>
                        Top:&nbsp;
                        <Counter
                           count={this.state.imageryText.length}
                           max={MAX_CARD_CHARS}
                        />
                        &nbsp;&nbsp;&nbsp;Bottom:&nbsp;
                        <Counter
                           count={this.state.answerText.length}
                           max={MAX_CARD_CHARS}
                        />
                     </p>
                  </div>
                  <div className="clearfix"></div>

                  <div className="row mb-4">
                     <div className="col">
                        <Link
                           className="btn btn-link"
                           to={this.props.editableCard.prevRoute}
                        >
                           Discard changes
                        </Link>
                     </div>

                     <div className="col">
                        <Link
                           className={classnames(
                              "btn btn-primary btn-lg float-right",
                              { disabled: this.checkHasInvalidCharacterCount() }
                           )}
                           to={this.props.editableCard.prevRoute}
                        >
                           <img
                              src="/icons/save.svg"
                              width="20px"
                              style={{
                                 marginBottom: "5px",
                                 marginRight: "8px",
                              }}
                              alt=""
                           />
                           Save
                        </Link>
                     </div>
                  </div>

                  {/* <!-- card properties --> */}
                  <h4 className="mt-6">Card properties</h4>

                  <table className="col-12 col-sm-8 table table-borderless table-sm">
                     <tbody>
                        <tr>
                           <th scope="row">Created on:</th>
                           <td>
                              {toDisplayData(
                                 this.props.editableCard.card.createdAt,
                                 "MMM dd, yyyy"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th scope="row">Last attempt:</th>
                           <td>
                              {toDisplayData(
                                 this.props.editableCard.card.lastAttemptAt,
                                 "MMM dd, yyyy"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th scope="row">Next attempt:</th>
                           <td>
                              {toDisplayData(
                                 this.props.editableCard.card.nextAttemptAt,
                                 "MMM dd, yyyy"
                              )}
                           </td>
                        </tr>
                        <tr>
                           <th scope="row">Consecutives:</th>
                           <td>
                              {
                                 this.props.editableCard.card
                                    .totalSuccessfulAttempts
                              }
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  {/* <!-- show delete checkbox --> */}
                  <div className="custom-control custom-checkbox mb-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id="show-delete"
                        checked={this.state.hasDeleteButton}
                        onChange={(e) => {
                           this.toggleHasDeleteButton(e);
                        }}
                     />
                     <label
                        className="custom-control-label"
                        htmlFor="show-delete"
                     >
                        Show delete button
                     </label>
                  </div>

                  {/* <!-- delete this card button --> */}
                  {this.state.hasDeleteButton && (
                     <div className="row mb-4" id="delete-button">
                        <div className="col">
                           <Link
                              className="btn btn-outline-danger"
                              to={this.changeRoute(
                                 this.props.editableCard.prevRoute
                              )}
                              onClick={() => this.deleteCard()}
                           >
                              Delete this card
                           </Link>
                        </div>
                     </div>
                  )}

                  <div className="custom-control custom-switch">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id={"show-packed-switch"}
                     />
                  </div>

                  {/* <!-- end of content --> */}
               </>
            )}
         </AppTemplate>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {
      // put all the things in state we need access to in this component
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit); // this is "currying"
