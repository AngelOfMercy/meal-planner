import React from 'react';

import RecipeForm from './RecipeForm';



export default class RecipeUpdate extends React.Component{
	render(){
		console.log(this.props)
		return(
			<RecipeForm update id={this.props.match.params.id} />
		)
	}
} 