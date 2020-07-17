import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducers from "./combineReducers";

// the initial global state of the app
const initialState = {
   currentUser: {},
   queue: {
      cards: [],
      index: 0,
   },
   editableCard: {
      card: [],
      prevRoute: "",
   },
   creatableCard: {
      // answer: "", imagery: ""
   },
};

const store = createStore(combineReducers, initialState, composeWithDevTools());

export default store;
