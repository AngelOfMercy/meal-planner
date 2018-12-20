import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

const mapStateToProps = state => {
	return {
		shopping: state.shopping,
		selection: state.selection
	}
}

class ConnectedShoppingList extends React.Component{
	constructor(props){
		super(props);

		this.state = {

		}

		this.getShoppingList = this.getShoppingList.bind(this);
	}

	getShoppingList(){
		const menu = _.uniq(this.props.selection);
		console.log('Menu: ', menu);

		let ingredientList = []
		menu.forEach(item => {
			if(item){
				ingredientList.push(...this.props.shopping[item]);
			}
		})

		console.log('List', ingredientList);

		return _.uniqBy(ingredientList, 'name');
	}


	render(){
		return (
			<div>
				<h2>
					Shopping List
				</h2>
				<ul>
				{console.log(this.getShoppingList())}
				{this.getShoppingList().map(item => {
					return (
						<li>
							{item.name}
						</li>
					)

				})}
				</ul>
			</div>
		);
	}
}

const ShoppingList = connect(mapStateToProps)(ConnectedShoppingList);

export default ShoppingList