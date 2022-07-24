import React from "react";
import { useState } from 'react';

function CardEnrolmentForm() {

    const [values, setValues] = useState({
        name: '', cardnumber: '', limit: ''
    });

    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    };

    return (
        <form id="submit_card" onSubmit={this.onSubmit}>
            <div className="head-text">
                <label>Name</label><br />
                <input type="text" required
                    value={values.name} onChange={set('name')} /><br />
                <p>
                    <label>Card Number</label><br />
                    <input type="text" required minLength="16" maxLength="19"
                        value={values.cardnumber} onChange={set('cardnumber')} /><br />
                </p>

                <p>
                    <label>Limit</label><br />
                    <input type="number"
                        value={values.limit} onChange={set('limit')} /><br />
                </p>

                <p>
                    <button type="submit">Add</button>
                </p>
            </div>
        </form >
    )
}

export default CardEnrolmentForm;