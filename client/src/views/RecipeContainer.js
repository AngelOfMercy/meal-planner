import React from 'react';

import {Grid, Row} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import RecipeForm from './recipes/RecipeForm';
import RecipeList from './recipes/RecipeList';



export default class AddRecipeContainer extends React.Component {
	render(){
		return (
			<Router>
				<Switch>
					<Route exact path={`${this.props.match.url}/add`} component={RecipeForm}/>
					<Route path={`${this.props.match.url}/`} component={RecipeList}/>
				</Switch>
			</Router>
		);
	}
}