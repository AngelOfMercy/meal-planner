import React, { Component } from 'react';
import './App.css';

import AddRecipeContainer from './views/RecipeContainer';

import PlannerContainer from './views/PlannerContainer';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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

                <NavItem componentClass={Link} href="/recipe" to="/recipe">Add Recipe</NavItem>
                <NavItem componentClass={Link} href="/" to="/">Planner</NavItem>


            </Nav>
          </Navbar>

          <Switch>
            <Route path="/recipe" component={AddRecipeContainer}/>
            <Route path="/"       component={PlannerContainer}/>
          </Switch>



      </div>
      </Router>

    );
  }
}

export default App;
