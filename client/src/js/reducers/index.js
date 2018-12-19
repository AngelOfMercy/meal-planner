import {ADD_SHOPPING, ADD_RECIPE} from '../constants/action-types';

const initialState = {
	shopping: [],
	recipe: []
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_SHOPPING:
			return {
				...state,
				shopping: {
					...state.shopping,
					[action.payload.day]:action.payload.ingredients
				}
			};
		case ADD_RECIPE:
			return {
				...state,
				recipe: [...state.recipe, action.payload]
			}
		default:
			return state;
	}
};

export default rootReducer;