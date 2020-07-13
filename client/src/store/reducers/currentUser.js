import actions from "../actions";
import isEmpty from "lodash/isEmpty";

export default function currentUser(currentUser = {}, action) {
   // default for state is an empty object

   // let newCurrentUser = { ...currentUser }; // make a copy of it as we cannot change the original one in place

   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         // remove the auth token when they log out
         if (isEmpty(action.payload)) {
            localStorage.removeItem("authToken");
         }
         return action.payload; // if its empty or not, return it to the redux store
      default:
         return currentUser;
   }
}
