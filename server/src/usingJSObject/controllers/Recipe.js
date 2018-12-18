
import RecipeModel from '../models/Recipe';

function sendError(res, num, message){
	return res.status(num).send({
		message
	})
}

const Recipe = {
	create(req, res) {
		if(!req.body.title && !req.body.items){
			return sendError(res, 400, 'All fields required');
		}

		const recipe = RecipeModel.create(req.body);
		return res.status(201).send(recipe);
	},
	getAll(req, res) {
		return res.status(200).send(RecipeModel.findAll());
	},
	getOne(req, res) {
		const recipe = RecipeModel.findOne(req.params.id);
		if(!recipe){
			return sendError(res, 404, 'Recipe not found');
		}
		return res.send(200).send(recipe);
	},
	update(req, res) {
		return sendError(res, 501, 'Update not yet supported');
	},
	delete(req, res) {
		return sendError(res, 501, 'Delete not yet supported');
	}
}

export default Recipe;