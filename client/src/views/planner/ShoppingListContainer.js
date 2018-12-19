import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

const mapStateToProps = state => {
	return {
		list: state.list
	}
}

class ConnectedShopping extends React.Component{
	constructor(props){
		super(props);

		this.state = {

		}

		//.getUniqueIngredients = this.getUniqueIngredients.bind(this);
		//this.handleChange = this.handleChange.bind(this);
	}

	render(){
		return (
			<ul>
				{Object.keys(this.props.list).map(day => {
					return (
						<li>
							{day}
						</li>
					)

				})}
			</ul>
		)
	}
}

const Shopping = connect(mapStateToProps)(ConnectedShopping);

export default Shopping