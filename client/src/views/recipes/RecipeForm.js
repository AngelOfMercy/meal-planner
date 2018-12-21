import './RecipeForm.css'

import React from 'react';
import { connect } from 'react-redux';

import { addRecipe } from '../../js/actions/index';

import _ from 'lodash';
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, Button, ListGroup, ListGroupItem, Col, Row } from 'react-bootstrap';
//import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router-dom';


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

class ConnectedRecipeForm extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			title: "",
			ingredients: [],
			newIngredient: "",
			isValid: {
				title: null
			},
			redirect: props.redirect || '/recipe/list',
			toRedirect: false,
			isLoading: props.update || false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);

		this.renderForm = this.renderForm.bind(this);
	}

	async componentWillMount(){
		console.log('Will mount Form')
		if(this.props.update){
			console.log('Prop', this.props)
			axios.get(`/api/recipe/${this.props.id}`).then(recipe => {
				axios.get(`/api/recipe/${this.props.id}/ingredients`).then(items => {
					console.log(items.data);
					this.setState({
						...recipe.data,
						isLoading:false,
						ingredients: items.data
					})
				})
			});



		}
	}

	handleChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	updateRecipe(id, val){
		return axios.put(`/api/recipe/${id}`, val)
	}

	addRecipe(val){
		return axios.post('/api/recipe', val)
	}

	handleSubmit(e){
		e.preventDefault();

		const { title, ingredients, description } = this.state;

		if(title === "" || ingredients.length <= 0){
			return; //TODO: Create and handle an error?
		}

		this.setState({
			isLoading: true
		})

		
		const value = {
			title,
			ingredients,
			description: description || ""
		}

		if(this.props.update){
			this.updateRecipe(this.props.id, value).then(res => {
				this.setState({
					toRedirect: true
				})
			});
		} else {
			this.addRecipe(value).then( res => {
				this.setState({
					toRedirect: true
				})
			})
		}
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
		if(this.state[key].length === 0){
			return null
		} else if (this.state.isValid[key]) {
			return "error"
		} else {
			return "success"
		}
	}

	renderForm(){
		return (
			<div>
				<form>
					<FormGroup controlId="title" validationState={this.getValidity("title")}>
						<ControlLabel>Recipe Name</ControlLabel>
						<FormControl type="text"
								placeholder="Enter name"
								onChange={this.handleChange}
								value={this.state.title}/>
					</FormGroup>

					<FormGroup>
						<ListGroup>
							{this.state.ingredients.map(ing => {
								return (
									<ListGroupItem key={ing.name}>
									<Row>
										<Col xs={10}>
												{ing.name}
										</Col>
										<Col xs={2} className="RemoveItemButton" id={ing.name} onClick={this.removeIngredient}>
											<div id={ing.name} >
												X
											</div>
										</Col>
									</Row>
									</ListGroupItem>
								)
							})}
						</ListGroup>
					</FormGroup>
							<FormGroup controlId="newIngredient" className="IngredientText">
								<ControlLabel>Add Ingredient</ControlLabel>
								<FormControl type="text" placeholder="Enter ingredient" onChange={this.handleChange} xs={8} value={this.state.newIngredient}/>
							</FormGroup>
				</form>
				<Button onClick={this.addIngredient}>Add Ingredient</Button>
				<div className="AddButton">
					<Button onClick={this.handleSubmit}>{this.props.update ? "Update" : "Add"} Recipe</Button>				
				</div>
			</div>
		)
	}

	render(){

		if(this.state.toRedirect){
			return (
				<Redirect to={this.state.redirect}/>
			)
		}

		if(this.state.isLoading){
			return (
				<div>
					Processing
				</div>
			)
		}

		return this.renderForm()
	}

}

const RecipeForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedRecipeForm);

export default RecipeForm;