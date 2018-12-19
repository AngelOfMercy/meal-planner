import React from 'react';

import Planner from './Planner';
import Shopping from './Shopping';
import RecipeForm from './recipes/RecipeForm';

import {Grid, Row, Col} from 'react-bootstrap';

export default class Main extends React.Component {
	render() {
		return (
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
		);
	}
}