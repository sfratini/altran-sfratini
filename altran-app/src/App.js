import React, { Component } from 'react';
import Table from './components/Table';


class App extends Component {

  render() {

    const url = this.props.url || "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

    return (
      <Table url={url}/>
    );
  }
}

export default App;
