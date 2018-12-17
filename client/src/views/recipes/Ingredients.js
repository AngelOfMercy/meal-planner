import React from 'react';

import { Checkbox } from 'react-bootstrap';

export default class Ingredients extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			//TODO option to hide ingredients that you have
		}

	}

	render(){
		return (<form>
			{this.props.ingredients.map(ing => {
				return (
					<Checkbox
						key={ing.name}
						checked={ing.have}
						onClick={this.props.handleChange}
						name={ing.name}>
						{ing.name}
					</Checkbox>
				)

			})}
		</form>)
	}
}