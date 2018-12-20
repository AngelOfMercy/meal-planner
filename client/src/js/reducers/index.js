import {ADD_SHOPPING, ADD_RECIPE, UPDATE_DAYPLAN} from '../constants/action-types';

const initialState = {
	list: {},
	selection: [],
	recipe: []
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_SHOPPING:
			return {
				...state,
				shopping: {
					...state.shopping,
					[action.payload.id]:action.payload.ingredients
				}
			};
		case ADD_RECIPE:
			return {
				...state,
				recipe: [...state.recipe, action.payload]
			}
		case UPDATE_DAYPLAN:
			let selection = [...state.selection];
			selection[action.payload.index] = action.payload.id;
			return {
				...state,
				selection
			}
		default:
			return state;
	}
};

export default rootReducer;