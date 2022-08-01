import React from "react";

import { useState } from 'react';

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
        if (name === "cardLimit") {
            regex = /^[0-9]*[.]?[0-9]*$/;
        } else if (name === "cardNumber") {
            regex = /^[\d ]*$/;
        }

        return ({ target: { value } }) => {
            if (value === '' || regex.test(value)) {
                setValues(oldValues => ({ ...oldValues, [name]: value }));
            }
        }
    };

    function isCardNumberValid(cardNumber) {

        var bDigitEvenPlace = false;
        var digit = 0;
        var luhn10Sum = 0;
        var len = 0;

        cardNumber = cardNumber.replace(/\s+/g, '');

        len = cardNumber.length;

        if (len <= 19) {
            while (--len >= 0) {
                digit = cardNumber[len];
                if (digit >= 0 && digit <= 9) {
                    if (bDigitEvenPlace) {
                        digit = digit * 2;
                    }

                    luhn10Sum += Math.floor(digit / 10);
                    luhn10Sum += digit % 10;

                    bDigitEvenPlace = !bDigitEvenPlace;
                }
                else {
                    return false;
                }
            }
        }
        else
            return false;

        if ((0 === luhn10Sum % 10) && (0 !== luhn10Sum / 10))
            return true;

        return false;

    }


    const saveFormData = async () => {
        //alert('name ' + values.cardHolderName + "cardNumber " + values.cardNumber + "cardLimit " + values.cardLimit);

        const response = await fetch("http://localhost:8081/card-servicing/cards/enrol", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(values)
        });

        const respnseContent = await response.json();

        if (response.status !== 200) {
            //if (respnseContent.message.length > 0)
            //console.log('Post status :' + response.json());
            throw new Error(` : ${response.status + " - " + respnseContent.message}`);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {
            if (isCardNumberValid(values.cardNumber)) {
                if (values.cardLimit > 0) {
                    if (values.cardHolderName.length > 0) {

                        await saveFormData();
                        //alert('Your card was enrolled successfully!');

                        props.updateListForNewCard(values);

                        setValues({
                            cardHolderName: '', cardNumber: '', cardLimit: ''
                        });
                    } else {
                        alert("Card Holder Name can't be zero length, please try with valid name");
                    }

                } else {
                    alert("Card limit can't be zero (0), please try with valid Card limit");
                }
            }
            else {
                alert("Card Number is Invalid, please try with Valid Card Number");
            }

        } catch (e) {
            alert(`Enrolement failed! ${e.message}`);
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
                    <input type="text" pattern="^[\d ]*$" required maxLength="19" message="Only numeric 16 digits"
                        value={handleCardDisplay()} onChange={set('cardNumber')} /><br />
                </p>

                <p>
                    <label>Limit</label><br />
                    <input type="text" required
                        value={values.cardLimit} onChange={set('cardLimit')} /><br />
                </p>

                <p>
                    <button className="button-color" type="submit"> Add </button>
                </p>
            </div>
        </form >
    )
}

export default CardEnrolmentForm;