import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { addShopping } from '../../js/actions/index';

import _ from 'lodash';

//import Ingredients from './Ingredients';

import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const mapStateToProps = state => {
	return {
		// recipe: state.recipe
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addShopping: shopping => dispatch(addShopping(shopping))
	}
}


class ConnectedContainer extends React.Component{

	constructor(props){
		super(props)

		this.state = {
			selection: "None"
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})

		if(e.target.value !== "None"){

			axios.get(`/api/recipies/ingredients/${e.target.value}`).then(data => {
				console.log('API Ingredients data: ', data);
			})

			let selectedRecipe = _.find(this.props.recipe, recipe => {
				return recipe.title === e.target.value
			});

			this.props.addShopping({
				day: this.props.day,
				ingredients: selectedRecipe.ingredients
			})
		} else {
			this.props.addShopping({
				day: this.props.day,
				ingredients: []
			})
		}

	}

	render(){
		return (
			<form>
				<FormGroup>
					<ControlLabel>{this.props.day} Dinner</ControlLabel>
						<FormControl id="selection" componentClass="select" placeholder="None" onChange={this.handleChange}>
							{this.props.recipe.map(rec => {
								console.log('Option: ', rec);
								return (
									<option key={rec.id} value={rec.id}>
										{rec.title}
									</option>
								)
							})}
							<option value="None">---</option>
						</FormControl>
				</FormGroup>
			</form>
		)
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ConnectedContainer);

export default Container;