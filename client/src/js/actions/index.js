import { ADD_SHOPPING, ADD_RECIPE, UPDATE_DAYPLAN } from '../constants/action-types';

export const addShopping = shopping => ({
	type: ADD_SHOPPING,
	payload: shopping
})

export const addRecipe = recipe => ({
	type: ADD_RECIPE,
	payload: recipe
})

export const updateDayPlan = plan => ({
	type: UPDATE_DAYPLAN,
	payload: plan
})