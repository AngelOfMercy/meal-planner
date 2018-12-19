import React from 'react';

import Planner from './planner/DailyPlanner';
import Shopping from './planner/ShoppingListContainer';
import RecipeForm from './recipes/RecipeForm';

import {Grid, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';

import axios from 'axios';
import Container from './planner/daily/DailyController';


export default class PlanningContainer extends React.Component {



	constructor(props){

		super(props);

		this.state = {
			isLoading: true
		}
	}

	componentWillMount(){
		axios.get('/api/recipe').then(res => {
			console.log('Recipe date recieved: ', res.data.rows);
			this.setState({
				recipe: res.data.rows,
				isLoading: false
			});
		})
	}

	render() {

		if(this.state.isLoading){
			return <Grid>
				Loading...
			</Grid>;
		}

		console.log(this.state.recipe);
		return (
			<Grid className="PlannerContainer">
			  <Row>
				<Col xs={12} md={8}>
				  <Planner recipe={this.state.recipe}/>
				</Col>
				<Col xs={12} md={4}>
				  <Shopping />
				</Col>
			  </Row>
			</Grid>
		);
	}
}