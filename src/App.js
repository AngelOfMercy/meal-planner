import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Planner from './views/Planner';
import Shopping from './views/Shopping';
import RecipeForm from './views/recipes/RecipeForm';

import {Grid, Row, Col, Navbar} from 'react-bootstrap';

class App extends Component {
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
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <h1>New Recipe</h1>
              <RecipeForm></RecipeForm>
            </Col>
            <Col xs={12} md={4}>
              <h1>Daily Meals</h1>
              <Planner/>
            </Col>
            <Col xs={12} md={4}>
              <h1>Shopping List</h1>
              <Shopping/>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default App;
