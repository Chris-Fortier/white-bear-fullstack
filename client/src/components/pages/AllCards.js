import React from "react";
import AppTemplate from "../ui/AppTemplate";
import MemoryCard from "../ui/MemoryCard";
import axios from "axios";

const userId = "6eb4cf5f-f8d8-4e7c-9663-764438da6e18";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   // this is a "lifecycle" method like render(), we don't need to call it manually
   componentDidMount() {
      this.setMemoryCards();
   }

   setOrder(e) {
      const newOrder = e.target.value;
      console.log(newOrder);
      this.setState({ order: newOrder }, () => this.setMemoryCards()); // this will call the fucntion after setting the state, ()=> this syntax is necessary
   }

   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=${userId}&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            // res is shorthand for response
            // changed to an ES6 arrow function so we can use "this" inside of it
            // they maintian the this from above and don't override it
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
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
                     onClick={() => this.setSearchTerm()}
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
                        <option value="memory_cards.created_at%20DESC">
                           Most recent
                        </option>
                        <option value="memory_cards.created_at%20ASC">
                           Oldest
                        </option>
                        <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                           Hardest
                        </option>
                        <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                           Easiest
                        </option>
                     </select>
                  </div>
               </div>
            </form>

            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard card={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
