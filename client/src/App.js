import React, { Component } from 'react';
import './App.css';

import RecipeForm from './views/recipes/RecipeForm';

import Main from './views/Main';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import {Grid, Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {


  componentDidMount(){
    console.log('App did mount?');
  }

  render() {
    return (
      <Router>
      <div className="App">

          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                Meal Planner
              </Navbar.Brand>
            </Navbar.Header>

            <Nav>

                <NavItem componentClass={Link} href="/recipe" to="/recipe">Add Recipe</NavItem>
                <NavItem componentClass={Link} href="/" to="/">Planner</NavItem>


            </Nav>
          </Navbar>

          <Switch>
            <Route path="/recipe" component={RecipeForm}/>
            <Route path="/"       component={Main}/>
          </Switch>



      </div>
      </Router>

    );
  }
}

export default App;
