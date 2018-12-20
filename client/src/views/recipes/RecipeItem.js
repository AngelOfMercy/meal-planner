import React from 'react';
import './RecipeItem.css'
import {Grid, Row, Col, Button} from 'react-bootstrap';

export default class RecipeItem extends React.Component {
	constructor(props){
		super(props);

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
							<Button>Hi</Button>
						hi
						</div>
						Delete
					</Col>
				</Row>
				<Row>
					{this.props.recipe.description}
				</Row>
			</Grid>
		)

	}
}