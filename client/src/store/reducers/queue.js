import actions from "../actions";

export default function queue(queue = {}, action) {
   // default for state is an empty array

   // action has two things in it: action.payload and action.type

   let newQueue = { ...queue }; // make a copy of it as we cannot change the original one in place

   switch (action.type) {
      case actions.STORE_QUEUED_CARDS:
         console.log("FIRED STORE_QUEUED_CARDS");
         newQueue.cards = action.payload;
         return newQueue; // [{},{}]
      case actions.INCREMENT_QUEUE_INDEX:
         newQueue.index += 1;
         return newQueue;
      case actions.DECREMENT_QUEUE_INDEX:
         newQueue.index -= 1;
         return newQueue;
      case actions.RESET_QUEUE:
         newQueue.cards = [];
         newQueue.index = 0;
         return newQueue;
      default:
         return queue;
   }
}
