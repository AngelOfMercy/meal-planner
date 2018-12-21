import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import {Grid, Row, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import RecipeItem from './RecipeItem';

class RecipeList extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			recipe:[],
			isLoading: true
		}

		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount(){
		axios.get('/api/recipe').then(res => {
			this.setState({
				recipe: res.data.rows,
				isLoading: false
			});
		})
	}

	handleDelete(id){
		const removed = _.remove(this.state.recipe, item => {
				return item.id !== id;
		})
		this.setState({
			recipe: removed
		});
	}

	render(){

		let content = <div>
			Loading Content
		</div>;

		if(!this.state.isLoading){
			content =
				<ListGroup>
					{this.state.recipe.map(item => {
						return (
							<ListGroupItem key={item.id} >
								<RecipeItem 
									recipe={item}
									delete={this.handleDelete}/>
							</ListGroupItem>
						)
					})}
				</ListGroup>
			;
		}

		return (
			<Grid>
				<Row>
					<h2>
						Recipes
					</h2>
				</Row>
				<Row>
					{content}
				</Row>
				<Row>
					<LinkContainer to="/recipe/add">
						<Button>Add New Recipe</Button>
					</LinkContainer>
				</Row>
			</Grid>
		)
	}
}

export default RecipeList;