import React from 'react';

import {Grid, Row, Col, Button} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap'

class RecipeList extends React.Component {
	render(){
		return (
			<Grid>
				<Row>
					<h2>
						Recipes
					</h2>
				</Row>
				<Row>
					TO GO HERE
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