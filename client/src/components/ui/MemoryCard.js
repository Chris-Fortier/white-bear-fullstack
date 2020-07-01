import React from "react";
// import EditButton from "./EditButton";
import { Link } from "react-router-dom"; // a React element for linking
import editIcon from "../../icons/edit.svg"; // thumbs up icon
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.card, // current card
            prevRoute: "/all-cards",
         },
      });
   }

   render() {
      return (
         <div className="row mb-5">
            <div className="col-9 col-sm-10">
               <div className="card bg-primary">
                  <div className="card-body allcards">
                     {this.props.card.imagery}
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div className="card-body allcards">
                     {this.props.card.answer}
                  </div>
               </div>
            </div>
            <div className="col-3 col-sm-2">
               {/* <EditButton cssClasses="btn btn-link float right" hasIcon={true} /> */}
               <Link
                  to="/edit"
                  className="btn btn-link float right"
                  onClick={() => {
                     this.storeEditableCard();
                  }}
               >
                  <img
                     src={editIcon}
                     width="20px"
                     style={{
                        marginBottom: "5px",
                        marginRight: "8px",
                     }}
                     alt=""
                  />
                  Edit
               </Link>
            </div>
         </div>
      );
   }
}

// maps the store to props
function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(MemoryCard); // this is "currying"
