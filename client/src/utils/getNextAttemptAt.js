import addDate from "date-fns/add";
import formatDate from "date-fns/format";

export default (level, lastAttemptAt) => {
   const levelDuration = {
      1: { minutes: 10 },
      2: { hours: 3 },
      3: { days: 1 },
      4: { days: 3 },
      5: { days: 7 },
      6: { weeks: 2 },
      7: { weeks: 5 },
      8: { weeks: 20 },
      9: { years: 1 },
      10: { years: 2 },
      11: { years: 4 },
      12: { years: 8 },
   };

   // return as ms past the epoch
   const nextAttemptAt = addDate(lastAttemptAt, levelDuration[level]);
   const timeStamp = Number(formatDate(nextAttemptAt, "T"));
   return timeStamp;
};
