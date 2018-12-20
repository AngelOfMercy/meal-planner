import React from 'react';

import {Grid, Row} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import RecipeForm from './recipes/RecipeForm';
import RecipeList from './recipes/RecipeList';



export default class RecipeContainer extends React.Component {
	render(){

		console.log(this.props.match);

		return (

				<Switch>
					<Route exact path={`${this.props.match.path}/add`} component={RecipeForm}/>
					<Route exact path={this.props.path} component={RecipeList}/>

				</Switch>

		);
	}
}