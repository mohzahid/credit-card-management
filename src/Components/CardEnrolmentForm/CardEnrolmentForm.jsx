import React, { useEffect } from "react";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCardHolderName, setCardNumber, setCardLimit, setCardBalance } from '../../Redux/actions';


const CardEnrolmentForm = (props) => {

    const [values, setValues] = useState({
        cardHolderName: '', cardNumber: '', cardLimit: ''
    });

    const handleCardDisplay = () => {
        const rawCardNumber = [...values.cardNumber.split(' ').join('')]; // Remove old space
        const creditCard = [] // Create card as array
        rawCardNumber.forEach((t, i) => {
            if (i > 3 && i % 4 === 0) creditCard.push(' '); // Add space
            creditCard.push(t)
        })
        return creditCard.join(''); // Transform card array to string
    }

    const set = name => {

        var regex = /\w/;
        if (name == "cardLimit") {
            regex = /^[0-9]*[.]?[0-9]*$/;
        } else if (name == "cardNumber") {
            regex = /^[\d ]*$/;
        }

        return ({ target: { value } }) => {
            if (value === '' || regex.test(value)) {
                setValues(oldValues => ({ ...oldValues, [name]: value }));
            }
        }
    };

    const saveFormData = async () => {
        alert('name ' + values.cardHolderName + "cardNumber " + values.cardNumber + "cardLimit " + values.cardLimit);

        const response = await fetch("http://localhost:8081/card-servicing/cards/enrol", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(values)
        });

        const respnseContent = await response.json();
        alert(respnseContent.message);

        if (response.status !== 200) {
            //console.log('Post status :' + response.json());
            throw new Error(`Request failed: ${response.status}`);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {
            await saveFormData();
            //alert('Your card was enrolled successfully!');

            props.updateListForNewCard(values);

            setValues({
                cardHolderName: '', cardNumber: '', cardLimit: ''
            });

        } catch (e) {
            //alert(`Enrolement failed! ${e.message}`);
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="head-text">
                <p>
                    <label>Name</label><br />
                    <input type="text" required
                        value={values.cardHolderName} onChange={set('cardHolderName')} /><br />
                </p>
                <p>
                    <label>Card Number</label><br />
                    <input type="text" pattern="^[\d ]*$" required minLength="16" maxLength="19"
                        value={handleCardDisplay()} onChange={set('cardNumber')} /><br />
                </p>

                <p>
                    <label>Limit</label><br />
                    <input type="text" required
                        value={values.cardLimit} onChange={set('cardLimit')} /><br />
                </p>

                <p>
                    <button className="button-color" type="submit">Add</button>
                </p>
            </div>
        </form >
    )
}

export default CardEnrolmentForm;