import actions from "../actions";

export default function editableCard(editableCard = {}, action) {
   // default for state is an empty array

   // action has two things in it: action.payload and action.type

   let newEditableCard = { ...editableCard }; // make a copy of it as we cannot change the original one in place

   switch (action.type) {
      // type & payload
      case actions.STORE_EDITABLE_CARD:
         console.log("FIRED STORE_EDITABLE_CARD");
         newEditableCard.card = action.payload.card;
         newEditableCard.prevRoute = action.payload.prevRoute;
         return newEditableCard;
      default:
         return editableCard;
   }
}
