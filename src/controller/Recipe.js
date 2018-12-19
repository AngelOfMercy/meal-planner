const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db');

const Recipe = {
	async create(req, res) {

		const recipeId = uuidv4();
		const now = moment(new Date());

		//CREATE THE RECIPE DB ENTRY;
		const query = `INSERT INTO
			recipe(id, title, description, created_date, modified_date)
			VALUES($1, $2, $3, $4, $5)
			returning *`;
		const ingredientsQuery = `INSERT INTO
			ingredient(recipe_id, name, created_date, modified_date)
			VALUES ($1, $2, $3, $4)`;

		const values = [
			recipeId,
			req.body.title,
			req.body.description || "",
			now,
			now
		];

		try {
			const { rows } = await db.query(query, values);
			for (let i = 0; i < req.body.ingredients.length; i++){
				let itemValue = [
					recipeId,
					req.body.ingredients[i],
					now,
					now
				];
				await db.query(ingredientsQuery, itemValue)
			}
			return res.status(201).send(rows[0]);
		} catch (err) {
			console.log(err);
			return res.status(400).send(err);
		}
	},
	async getAll(req, res) {
		const findAllQuery = `SELECT * FROM recipe`;
		try {
			const { rows, rowCount } = await db.query(findAllQuery);
			return res.status(200).send({
				rows,
				rowCount
			})
		} catch (err) {
			console.log(err)
			return res.status(400).send(err);
		}
	},
	async getOne(req, res) {
		const findOneQuery = 'SELECT * FROM recipe WHERE id = $1';
		try {
			const { rows } = await db.query(findOneQuery);

			if(!rows[0]){
				res.status(404).send({
					message: 'Recipe not found'
				})
			}

			return res.status(200).send(rows[0]);
		} catch (err) {
			return res.status(400).send(err);
		}
	},
	async getIngredients (req, res) {
		const findIngredients = 'SELECT name FROM ingredients WHERE recipe_id = $1';

		try {
			const value = [
				req.params.id
			];

			const { rows } = await db.query(findIngredients, value);
			return res.status(200).send(rows);
		} catch (err) {
			return res.status(400).send(err);
		}
	},
	getShoppingList (req, res){
		const recipies = req.body.recipe;

		let findShoppingList = 'SELECT DISTINCT name FROM ingredients WHERE ' + 
			recipies.map((item, index) => {
			return `recipe_id = $${index+1}`
		}).join(' AND ');;
		
		const value = recipies.map((item) => {
			return item.id;
		})

		console.log(findShoppingList);
		console.log(value);

		try{
			const { rows } = await db.query(findShoppingList, value);
		} catch (err) {
			return res.status(400).send(err);
		}

	},
	async update(req, res) {
		const findOneQuery = 'SELECT * FROM recipe WHERE id=$1';
		const updateOneQuery = 'UPDATE recipe SET title=$1, modified=$2 WHERE id=$3 returning *';

		try {
			const { rows } = await db.query(findOneQuery, [req.params.id]);
			if(!rows[0]){
				return res.status(404).send({
					message: 'Recipe could not be found'
				})
			}
			const values = [
				req.body.title || rows[0].title,
				moment(new Date())
			]

			const response = await db.query(updateOneQuery, values);

			return res.status(200).send(response.rows[0]);
		} catch(err) {
			return res.status(400).send(err);
		}
	},
	async delete(req, res){
		return res.status(501).send({
			message: 'Not implemented yet'
		})
	}
}

module.exports = Recipe;