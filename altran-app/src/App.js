import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch'
import UserCard from './components/UserCard';
import Table from './components/Table';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import 'react-virtualized/styles.css'; 


class App extends Component {

  constructor(){
    super();
    this.state = {
      loading: false,
      town: [],
      error: null
    }
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
});
  }

  componentDidMount(){

    this.setState({loading: true}, () => {

      fetch("https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json")
        .then(response => {
            if (response.headers && response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") > -1)            
                return response.json();
            else return response.text();
        })
        .then(responseJson => {
            this.setState({
              loading: false,
              town: JSON.parse(responseJson).Brastlewark || []
            });
        })
        .catch(err => {
            this.setState({
              loading: false,
              error: err
            });
        })

    })
  }

  renderRow = ({ index, key, style, parent }) => {

    let item = this.state.town[index];

    return (
      <CellMeasurer 
      key={key}
      cache={this.cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}>
        <div style={style}>
         <UserCard item={item}/>
        </div>
      </CellMeasurer>
    );
  }
  

  render() {

    return (
      <Table/>
    );

    return (
      <div className="list">

        <AutoSizer>

        {({ width, height }) => {

          return <List
            width={width}
            height={height}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.renderRow}
            rowCount={this.state.town.length}
            deferredMeasurementCache={this.cache}
            overscanRowCount={3} />

        }}

        </AutoSizer>

      </div>
    );
  }
}

export default App;
