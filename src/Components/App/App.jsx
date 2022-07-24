import React from 'react'
import './App.css';

import Header from '../Header/Header';
import Function from '../Function/Function';
import CardEnrolmentForm from '../CardEnrolmentForm/CardEnrolmentForm';

class App extends React.Component {
  render() {
    return <div className="App">
      <Header />
      <Function />
      <CardEnrolmentForm />
      {/* card details form */}
      {/* card list display*/}
    </div>
  }
}

export default App;
