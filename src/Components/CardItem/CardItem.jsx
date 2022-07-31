import React from "react";

import { useState } from 'react';


function CardItem(props) {

    const [cardNumber, setCardNumber] = useState(props.cardItem.cardNumber);

    /*
const displayCardNumberFormat = cardNumber => {
    const splits = cardNumber.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
        spacedNumber = splits.join(" "); // Join all the splits with an empty space
    }

    setCardNumber({ [cardNumber]: spacedNumber });
}*/

    return (
        <tr>
            <td>
                {props.cardItem.cardHolderName}
            </td>
            <td>
                {console.log("Render card no.")}
                {props.cardItem.cardNumber.replace(/\s+/g, '').match(/.{1,4}/g).join(" ")}
                {/*cardNumber*/}
            </td>
            <td>
                £{props.cardItem.cardBalance}
            </td>
            <td>
                £{props.cardItem.cardLimit}
            </td>
        </tr>

    )
}

export default CardItem;