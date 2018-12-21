import React from 'react';

import { } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import RecipeForm from './recipes/RecipeForm';
import RecipeList from './recipes/RecipeList';
import RecipeUpdate from './recipes/RecipeUpdate';



export default class RecipeContainer extends React.Component {
	render(){

		console.log(this.props.match);

		return (
				<Switch>

					<Route exact path={`${this.props.match.path}/add`} component={RecipeForm}/>
					<Route exact path={`${this.props.match.path}/list`} component={RecipeList}/>
					<Route path={`${this.props.match.path}/update/:id`} component={RecipeUpdate}/> 
				</Switch>

		);
	}
}