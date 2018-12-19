import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

const mapStateToProps = state => {
	return {
		shopping: state.shopping
	}
}

class ConnectedShopping extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			availableItems: ["Butter"]
		}

		this.getUniqueIngredients = this.getUniqueIngredients.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	getUniqueIngredients(){
		let all = _.flatMap(this.props.shopping, day => {
			return _.flatMap(day, item => {
				return item.name
			});
		});
		return _.uniq(all);
	}

	renderListItem(item){
		if(!_.includes(this.state.availableItems, item)){
			return item
		} else {
			return (
				<strike>
					{item}
				</strike>
			)
		}
	}

	handleChange(e){
		if(_.includes(this.state.availableItems, e.target.id)){
			this.setState({
				availableItems: _.remove(this.state.availableItems, item => {
					return e.target.id === item
				})
			})
		} else {
			this.setState({
				availableItems: [...this.state.availableItems, e.target.id]
			})
		}
	}

	render(){
		return (
			<div>
				<ul>
					{this.getUniqueIngredients().map(item => {
						return (
							<li key={item} id={item} onClick={this.handleChange}>
								{this.renderListItem(item)}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

const Shopping = connect(mapStateToProps)(ConnectedShopping);

export default Shopping