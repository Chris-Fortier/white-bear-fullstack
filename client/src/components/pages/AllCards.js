import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
// import memoryCards from "../../mock-data/memory-cards";
import orderBy from "lodash/orderBy";
import axios from "axios";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: '[["createdAt"], ["desc"]]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   // this is a "lifecycle" method like render(), we don't need to call it manually
   componentDidMount() {
      axios
         .get(
            "https://raw.githubusercontent.com/punchcode-fullstack/white-bear-mpa/localstates/src/mock-data/memory-cards.json"
         )
         .then((res) => {
            // handle success
            // res is shorthand for response
            // changed to an ES6 arrow function so we can use "this" inside of it
            // they maintian the this from above and don't override it
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filterByInput() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      console.log("filter input", lowerCasedInput);
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];
      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         // filter all cards that include input in either the answer or imagery
         if (
            memoryCard.imagery.toLowerCase().includes(lowerCasedInput) ||
            memoryCard.answer.toLowerCase().includes(lowerCasedInput)
         ) {
            return true;
         }
         return false;
      });

      this.setState({ displayedMemoryCards: filteredMemoryCards }, () =>
         this.setMemoryCards()
      );
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => this.setMemoryCards()); // this will call the fucntion after setting the state, ()=> this syntax is necessary
   }

   // this looks at the order and reorders the memory cards
   setMemoryCards() {
      console.log("Setting memory cards");
      const copyOfDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      console.log("this.state.order", this.state.order);
      const toJson = JSON.parse(this.state.order);
      console.log("...toJson", toJson);
      const orderedMemoryCards = orderBy(copyOfDisplayedMemoryCards, ...toJson);
      console.log("orderedMemoryCards", orderedMemoryCards);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
   }

   // // changes the order of the memory cards
   // setMemoryCardsOrder(e) {
   //    console.log("You've made a change.");
   //    const newOrder = e.target.value;
   //    console.log(newOrder);
   //    const copyOfMemoryCards = [...this.state.memoryCards];
   //    const toJson = JSON.parse(newOrder);
   //    const orderedMemoryCards = orderBy(copyOfMemoryCards, ...toJson);
   //    this.setState({ order: newOrder, memoryCards: orderedMemoryCards });
   // }

   render() {
      return (
         <AppTemplate>
            {/* <!-- form stuff --> */}
            <form className="row mb-0">
               <div className="form-group col-8">
                  <input
                     className="form-control"
                     id="search-input"
                     placeholder="Search for a word"
                  />
               </div>
               <div className="col-4">
                  <button
                     className="btn btn-primary btn-block btn-sm"
                     onClick={() => this.filterByInput()}
                     id="search-button"
                     type="button"
                  >
                     Search
                  </button>
               </div>
            </form>

            {/* <!-- select version --> */}
            <form className="row mb-0">
               <label htmlFor="cars" className="col-4">
                  Sort cards by
               </label>

               <div className="form-group col-8">
                  <div className="dropdown">
                     <select
                        value={this.state.order}
                        className="float-right btn dropdown-toggle btn-block"
                        style={{ height: "36px" }}
                        onChange={(e) => this.setOrder(e)}
                     >
                        <option value='[["createdAt"], ["desc"]]'>
                           Most recent
                        </option>
                        <option value='[["createdAt"], ["asc"]]'>Oldest</option>
                        <option value='[["totalSuccessfulAttempts", "createdAt"], ["asc", "asc"]]'>
                           Hardest
                        </option>
                        <option value='[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'>
                           Easiest
                        </option>
                     </select>
                  </div>
               </div>
            </form>

            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
