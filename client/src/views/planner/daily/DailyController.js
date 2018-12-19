import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { addShopping } from '../../../js/actions/index';

import _ from 'lodash';

//import Ingredients from './Ingredients';

import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const mapStateToProps = state => {
	return {
		// recipe: state.recipe
		list: state.list
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
			selection: props.selection || null
		}

		this.handleChange = this.handleChange.bind(this);
		this.loadIngredients = this.loadIngredients.bind(this);
	}

	componentWillMount(){
		this.loadIngredients(this.state.selection);
	}

	loadIngredients(id){
		if(id && id !== ""){
			axios.get(`/api/recipe/${id}/ingredients/`).then(res => {

				//TODO: Filter out if given a non 200 response?

				this.props.addShopping({
					day: this.props.day,
					ingredients: res.data
				})
			})
		} else {
			this.props.addShopping({
				day: this.props.day,
				ingredients: []
			})
		}
	}

	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})

		this.loadIngredients(e.target.value);

		console.log(this.props.list);

	}

	render(){
		return (
			<form>
				<FormGroup>
					<ControlLabel>{this.props.day} Dinner</ControlLabel>
						<FormControl id="selection" componentClass="select" placeholder="None" onChange={this.handleChange}>
							<option value="">---</option>
							{this.props.recipe.map(rec => {
								console.log('Option: ', rec);
								return (
									<option key={rec.id} value={rec.id}>
										{rec.title}
									</option>
								)
							})}

						</FormControl>
				</FormGroup>
			</form>
		)
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(ConnectedContainer);

export default Container;