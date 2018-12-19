import React from 'react';
import {connect} from 'react-redux';

import axios from 'axios';

import Container from './recipes/Container';


//import { } from 'react-bootstrap'

const mapStateToProps = state => {
	return {
		recipe: state.recipe
	}
}


class ConnectedPlanner extends React.Component{

	constructor(props){
		super(props);

		let date = new Date();

		this.state = {
			today: (date.getDay()-1)%7,
			week: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
		};

		this.getDayList = this.getDayList.bind(this);
	}

	componentWillMount(){
		console.log('Will mount?')
		axios.get('/recipe').then(data => {
			console.log(data);
		})
	}

	getDayList(today){
		let prefix = this.state.week.slice(today, this.state.week.length);
		let post = this.state.week.slice(0, today);
		return prefix.concat(post);
	}

	render(){
		return (
			<div>
				{this.state.week.map(day => {
						return (
							<Container key={day} day={day}>

							</Container>

						)
					})
				}
			</div>
		);
	}

}

const Planner = connect(mapStateToProps)(ConnectedPlanner);

export default Planner;