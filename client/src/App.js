import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Planner from './views/Planner';
import Shopping from './views/Shopping';
import RecipeForm from './views/recipes/RecipeForm';

import {Row, Col} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col xs={4}>
            <RecipeForm></RecipeForm>
          </Col>
          <Col xs={4}>
            <Planner/>
          </Col>
          <Col>
            <Shopping/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
