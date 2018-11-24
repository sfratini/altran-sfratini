import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserCard from './components/UserCard'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App url="https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders an error snack', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App url="https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json22" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a user card', () => {

  const item = {
    "id":0,
    "name":"Tobus Quickwhistle",
    "thumbnail":"http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg",
    "age":306,
    "weight":39.065952,
    "height":107.75835,
    "hair_color":"Pink",
    "professions":["Metalworker","Woodcarver","Stonecarver"," Tinker","Tailor","Potter"],
    "friends":["Cogwitz Chillwidget","Tinadette Chillbuster"]
  }

  const div = document.createElement('div');
  ReactDOM.render(<UserCard item={item}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});