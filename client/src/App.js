import React, { Component } from 'react';
import './App.css';

import RecipeContainer from './views/RecipeContainer';

import PlannerContainer from './views/PlannerContainer';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'

import {Navbar, Nav, NavItem, Grid} from 'react-bootstrap';

class App extends Component {


  componentDidMount(){
    console.log('App did mount?');
  }

  render() {
    return (
      <Router>
      <div className="App">

          <Navbar fluid collapseOnSelect>

            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
                  Meal Planner
                </Link>

              </Navbar.Brand>
            </Navbar.Header>

            <Nav>
            <LinkContainer to="/recipe/list">
              <NavItem>Recipes</NavItem>
            </LinkContainer>

            {/* <LinkContainer to="/">
              <NavItem>Planner</NavItem>
            </LinkContainer> */}


            </Nav>
          </Navbar>
          <Grid className="AppContent">
            <Switch>
              <Route exact path="/" component={PlannerContainer}/>
              <Route path="/recipe" component={RecipeContainer}/>

            </Switch>
          </Grid>



      </div>
      </Router>

    );
  }
}

export default App;
