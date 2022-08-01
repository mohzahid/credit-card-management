import React from "react";
import CardItem from "../CardItem/CardItem";


const ExistingCardsList = (props) => {

    const CardItems = props.cardsList.map(cardItem => <CardItem key={cardItem.cardNumer} cardItem={cardItem} />);

    return (
        <div>
            <div className="head-text"><h4>Existing Cards</h4></div>
            <div class="container">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Card Number</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CardItems}
                    </tbody>
                </table>
            </div >
        </div>
    );

};

export default ExistingCardsList;