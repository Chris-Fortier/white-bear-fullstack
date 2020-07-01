import React from "react";
import editIcon from "../../icons/edit.svg"; // thumbs up icon
import { Link } from "react-router-dom"; // a React element for linking

// this is a the edit button component used on all cards and also Review Answer
export default function EditButton(props) {
   return (
      <>
         <Link className={props.cssClasses} to="/edit">
            {props.hasIcon && (
               <img
                  src={editIcon}
                  width="20px"
                  style={{
                     marginBottom: "5px",
                     marginRight: "8px",
                  }}
                  alt=""
               />
            )}
            Edit
         </Link>
      </>
   );
}
