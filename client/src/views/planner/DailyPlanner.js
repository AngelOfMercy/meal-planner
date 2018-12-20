import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import DailyController from './daily/DailyController';


//import { } from 'react-bootstrap'

const mapStateToProps = state => {
	return {
		selection: state.selection
	}
}


class ConnectedPlanner extends React.Component{

	constructor(props){
		super(props);
		//let date = new Date();
		this.state = {
			//today: (date.getDay()-1)%7,
			week: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
		};
	}

	render(){

		return (
			<div>
				<h1>Day Planner</h1>
				{this.state.week.map((day, index) => {
						return (
							<DailyController
									key={index}
									day={day}
									index={index}
									selection={this.props.selection[index]}
									recipe={this.props.recipe} />
						)
					})
				}
			</div>
		);
	}

}

const Planner = connect(mapStateToProps)(ConnectedPlanner);

export default Planner;