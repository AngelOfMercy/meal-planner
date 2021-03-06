import React from 'react';

import Planner from './planner/DailyPlanner';
import Shopping from './planner/ShoppingList';

import {Grid, Row, Col} from 'react-bootstrap';

import axios from 'axios';


export default class PlanningContainer extends React.Component {



	constructor(props){

		super(props);

		this.state = {
			isLoading: true
		}
	}

	componentWillMount(){
		axios.get('/api/recipe').then(res => {
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

		return (
			<div className="PlannerContainer">
			  <Row>
				<Col xs={12} md={8}>
				  <Planner recipe={this.state.recipe}/>
				</Col>
				<Col xs={12} md={4}>
				  <Shopping />
				</Col>
			  </Row>
			</div>
		);
	}
}