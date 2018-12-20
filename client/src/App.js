import React, { Component } from 'react';
import './App.css';

import RecipeContainer from './views/RecipeContainer';

import PlannerContainer from './views/PlannerContainer';

import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'

import {Navbar, Nav, NavItem} from 'react-bootstrap';

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

            <LinkContainer to="/recipe/add">
              <NavItem>Recipes</NavItem>
            </LinkContainer>

            <LinkContainer to="/recipe/list">
              <NavItem>Recipes</NavItem>
            </LinkContainer>

            {/* <NavItem componentClass={Link} href="/recipe/list" to="/recipe/list">Recipes</NavItem> */}
                <NavItem componentClass={Link} href="/" to="/">Planner</NavItem>

            <NavLink to="/recipe/add">
              Hi
            </NavLink>

            <NavLink to="/recipe">
              Bye
            </NavLink>

            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={PlannerContainer}/>
            <Route path="/recipe" component={RecipeContainer}/>

          </Switch>



      </div>
      </Router>

    );
  }
}

export default App;
