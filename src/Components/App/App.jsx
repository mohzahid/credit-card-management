import React from 'react'
import './App.css';

import Header from '../Header/Header';
import Function from '../Function/Function';
import CardEnrolmentForm from '../CardEnrolmentForm/CardEnrolmentForm';
import ExistingCardsList from '../ExistingCardsList/ExistingCardsList';
import CardItem from '../CardItem/CardItem';

class App extends React.Component {

  state = {
    cardHolderName: ' ',
    cardNumber: 0,
    cardLimit: 0,
    cardBalance: 0,
    cardsList: [],
  };

  updateListOnFormSubmit = (val) => {

    console.log("UpdateList-1" + val.cardHolderName + "card Number" + val.cardNumber + "card Limit" + val.cardLimit);

    var items = this.state.cardsList;

    items.push({
      cardHolderName: val.cardHolderName,
      cardNumber: val.cardNumber,
      cardLimit: val.cardLimit,
      cardBalance: 0
    });

    this.setState({
      items,
      cardHolderName: '',
      cardNumber: '',
      cardLimit: 0,
      cardBalance: 0
    });

  }

  componentDidMount() {

    fetch("http://localhost:8081/card-servicing/cards/getAll")
      .then(res => res.json())
      .then(res => {
        this.setState({
          cardsList: res.listCards,
        })
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          //alert('Result Error');
        }
      );

    alert("Did Mount Is invoked-2");

  }


  render() {

    var cardsList = this.state.cardsList;

    return (
      <div className="App">
        <Header />
        <Function />
        <CardEnrolmentForm updateListForNewCard={this.updateListOnFormSubmit} />
        <div>
          {
            cardsList && cardsList.length > 0 ? (
              < ExistingCardsList cardsList={cardsList} />
            ) : ""
          }
        </div>
      </div >
    )
  }
}

export default App;
