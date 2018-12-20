import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { addShopping, updateDayPlan } from '../../../js/actions/index';

import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

const mapStateToProps = state => {
	return {
		// recipe: state.recipe
		list: state.list
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addShopping: shopping => dispatch(addShopping(shopping)),
		updateDayPlan: plan => dispatch(updateDayPlan(plan))
	}
}


class ConnectedContainer extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			selection: props.selection || ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.loadIngredients = this.loadIngredients.bind(this);
	}

	componentWillMount(){
		console.log('Selection: ', this.state.selection);
		this.loadIngredients(this.state.selection);
	}

	loadIngredients(id){
		if(id && id !== ""){
			axios.get(`/api/recipe/${id}/ingredients/`).then(res => {
				console.log(`Got ingredients for ${id}:`, res.data);
				this.props.addShopping({
					id,
					ingredients: res.data
				})

				this.props.updateDayPlan({
					index: this.props.index,
					id
				})
			})
		} else {
			// this.props.addShopping({
			// 	day: this.props.day,
			// 	ingredients: []
			// })

			this.props.updateDayPlan({
				index: this.props.index,
				id: null
			})
		}
	}

	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})

		this.loadIngredients(e.target.value);

	}

	render(){
		return (
			<form>
				<FormGroup>
					<ControlLabel>{this.props.day} Dinner - {this.props.selection}</ControlLabel>
						<FormControl id="selection"
								componentClass="select"
								placeholder="None"
								onChange={this.handleChange}
								value={this.state.selection}>

							<option value="">---</option>
							{this.props.recipe.map(rec => {
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