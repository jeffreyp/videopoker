import React from "react";

/*
export default (props) => {
    <figcaption className="cardHold">
        &nbsp;
        {props.hold && "HELD"}
        &nbsp
    </figcaption>
};
*/
 const CardHold = ({ hold }) => {
    return hold ? (
        <div className="cardHold">
            HELD
        </div>
    ) : null;
 };

 export default CardHold;