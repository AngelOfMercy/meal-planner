import React from 'react';
import './RecipeItem.css'
import {Grid, Row, Col, Button} from 'react-bootstrap';

import axios from 'axios';

export default class RecipeItem extends React.Component {
	constructor(props){
		super(props);

		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(e){
		axios.delete(`/api/recipe/${this.props.recipe.id}`);
		this.props.delete(this.props.recipe.id);
	}

	render(){
		return(
			<Grid>
				<Row>

					<Col xs={8}>
						<h4>{this.props.recipe.title}</h4>
					</Col>
					<Col className="float-right">
						<div className="float-right">
							<Button onClick={this.handleDelete}>
								Delete
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					{this.props.recipe.description}
				</Row>
			</Grid>
		)

	}
}