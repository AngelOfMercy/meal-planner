import React from 'react';
import { connect } from 'react-redux';

import { addRecipe } from '../../js/actions/index';

import _ from 'lodash';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, ListGroup, ListGroupItem, Col, Alert } from 'react-bootstrap';


const mapDispatchToProps = dispatch => {
	return {
		addRecipe: recipe => dispatch(addRecipe(recipe))
	}
}

const mapStateToProps = state => {
	return {
		recipe: state.recipe
	}
}

const defaultState = {
	title: "",
	ingredients: [],
	newIngredient: ""
}

class ConnectedRecipeForm extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			...defaultState,
			isValid: {
				title: null
			},
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleDismiss = this.handleDismiss.bind(this);

		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
	}

	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})

		console.log(e.target.id)

		// if(e.target.id === "title"){

		// 	const existing = _.map(this.props.recipe, (recipe) => {
		// 		return recipe.title;
		// 	})

		// 	this.setState({
		// 		isValid: {
		// 			title:_.includes(existing, e.target.value) || e.target.value === ""
		// 		}
		// 	})
		// }
	}

	handleSubmit(e){
		e.preventDefault();

		const existing = _.map(this.props.recipe, (recipe) => {
			return recipe.title;
		})

		const { title, ingredients } = this.state;

		if(_.includes(existing, title)){

			// this.setState({
			// 	isValidTitle: false
			// })
			return
		}

		this.props.addRecipe({
			title,
			ingredients
		})

		this.setState({
			...defaultState
		})
	}

	addIngredient(e){
		e.preventDefault();
		if(this.state.newIngredient.length > 0){
			this.setState({
				ingredients: [...this.state.ingredients, {
					name: this.state.newIngredient
				}],
				newIngredient: ""
			})
		}

	}

	removeIngredient(e){
		let removed = _.remove(this.state.ingredients, arg => {

			return arg.name !== e.target.id;
		})
		this.setState({
			ingredients: removed
		})
	}

	getValidity(key){
		console.log(key)
		if(this.state[key].length === 0){
			return null
		} else if (this.state.isValid[key]) {
			return "error"
		} else {
			return "success"
		}
	}

	render(){
		return (
			<div>

			<form>

				<FormGroup controlId="title" validationState={this.getValidity("title")}>
					<ControlLabel>Recipe Name</ControlLabel>
					<FormControl type="text" placeholder="Enter name" onChange={this.handleChange}/>
				</FormGroup>

				<ListGroup>
					{console.log('State: ', this.state)}
					{this.state.ingredients.map(ing => {
						return (
							<ListGroupItem key={ing.name}>
								<Col xs={10}>
										{ing.name}
								</Col>
								<Col>
									<Button id={ing.name} onClick={this.removeIngredient}>
										Remove
									</Button>
								</Col>
							</ListGroupItem>

						)
					})}
				</ListGroup>

				{/* <FieldGroup
							id="newIngredient"
							type="text"
							label=""
							placeholder="Add ingredient"
							onChange={this.handleChange}/> */}

				<FormGroup controlId="newIngredient">
					<ControlLabel>Add Ingredient</ControlLabel>
					<FormControl type="text" placeholder="Enter ingredient" onChange={this.handleChange}/>
					<Button onClick={this.addIngredient}>Add ingredient</Button>
				</FormGroup>




			</form>

			<Button onClick={this.handleSubmit}>Add</Button>
			</div>
		);
	}

}

const RecipeForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedRecipeForm);

export default RecipeForm;