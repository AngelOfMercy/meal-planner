import React from 'react';

import {Grid, Row} from 'react-bootstrap';

import RecipeForm from './recipes/RecipeForm';

export default class AddRecipeContainer extends React.Component {
	render(){
		return (
			<Grid>
				<Row>
					<RecipeForm/>
				</Row>
			</Grid>
		);
	}
}