
import moment from 'moment';
import uuid from 'uuid';
//import Recipe from '../controllers/Recipe';

class Recipe {
	constructor(){
		this.recipe = []
	}

	create(data) {
		const newRecipe = {
			id: uuid(),
			title: data.title || 'Untitled',
			items: data.items || [],
			dateCreated: moment.now(),
			dateLastModified: moment.now()
		}

		this.recipe.push(newRecipe);
		return newRecipe;
	}
	findOne(id) {
		return this.recipe.find(rec => rec.id === id);
	}
	findAll(){
		return this.recipe;
	}
	update(){
		//TODO
	}
	delete(){
		//TODO
	}
}

export default new Recipe();