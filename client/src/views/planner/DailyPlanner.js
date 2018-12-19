import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import DailyController from './daily/DailyController';


//import { } from 'react-bootstrap'

const mapStateToProps = state => {
	return {
		//recipe: state.recipe
	}
}


class ConnectedPlanner extends React.Component{

	constructor(props){
		super(props);

		let date = new Date();

		this.state = {
			today: (date.getDay()-1)%7,
			week: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
		};

	}

	render(){

		return (
			<div>
				<h1>Day Planner</h1>
				{this.state.week.map(day => {
						return (
							<DailyController key={day} day={day} recipe={this.props.recipe}>
							</DailyController>
						)
					})
				}
			</div>
		);
	}

}

const Planner = connect(mapStateToProps)(ConnectedPlanner);

export default Planner;