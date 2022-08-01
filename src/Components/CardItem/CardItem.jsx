import React from "react";

function CardItem(props) {

    return (
        <tr>
            <td>
                {props.cardItem.cardHolderName}
            </td>
            <td>
                {console.log("Render card no.")}
                {props.cardItem.cardNumber.replace(/\s+/g, '').match(/.{1,4}/g).join(" ")}
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