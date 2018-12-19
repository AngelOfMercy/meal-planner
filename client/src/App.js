import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Planner from './views/Planner';
import Shopping from './views/Shopping';
import RecipeForm from './views/recipes/RecipeForm';

import Main from './views/Main';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import {Grid, Row, Col, Navbar} from 'react-bootstrap';

class App extends Component {


  componentDidMount(){
    console.log('App did mount?');
  }

  render() {
    return (
      <div className="App">
      			<Navbar>
			        <Navbar.Header>
            <Navbar.Brand>
              Meal Planner
            </Navbar.Brand>
            </Navbar.Header>

          </Navbar>
        <Router>
          <Route exact path="/" component={Main}/>
        </Router>
      </div>
    );
  }
}

export default App;
