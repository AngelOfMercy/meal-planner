const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../db');


async function addIngredients(id, items){

	const now = moment(new Date());


	//const query = `UPDATE ingredient SET recipe_id=$1`

	const clearQuery = `DELETE FROM ingredient WHERE recipe_id=$1`;


	const {rows} = await db.query(clearQuery, [id]);

	console.log(rows);

	const query = `INSERT INTO
			ingredient(recipe_id, name, created_date, modified_date)
			VALUES ($1, $2, $3, $4)` ;
	
	for (let i = 0; i < items.length; i++){
		let itemValue = [
			id,
			items[i].name,
			now,
			now
		];

		

		db.query(query, itemValue)
	}
		
}

const Recipe = {
	async create(req, res) {

		const recipeId = uuidv4();
		const now = moment(new Date());

		//CREATE THE RECIPE DB ENTRY;
		const query = `INSERT INTO
			recipe(id, title, description, created_date, modified_date)
			VALUES($1, $2, $3, $4, $5)
			returning *`;
		

		const values = [
			recipeId,
			req.body.title,
			req.body.description || "",
			now,
			now
		];

		try {
			const { rows } = await db.query(query, values);

			await addIngredient(recipeId, req.body.ingredients);
			
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
		const findOneQuery = 'SELECT * FROM recipe WHERE id=$1';
		try {
			const { rows } = await db.query(findOneQuery, [req.params.id]);
			console.log(rows);
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
		const findIngredients = 'SELECT name FROM ingredient WHERE recipe_id = $1';

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
	// async getShoppingList (req, res){
	// 	const recipies = req.body.recipe;

	// 	console.log(req.body.recipies);

	// 	let findShoppingList = 'SELECT DISTINCT name FROM ingredient WHERE ' +
	// 		recipies.map((item, index) => {
	// 		return `recipe_id = $${index+1}`
	// 	}).join(' AND ');

	// 	console.log(findShoppingList);

	// 	// const value = recipies.map((item) => {
	// 	// 	return item.id;
	// 	// })

	// 	// console.log(value);

	// 	console.log(recipies);
	// 	try{
	// 		const { rows } = await db.query(findShoppingList, recipies);

	// 		return res.status(200).send(rows);
	// 	} catch (err) {
	// 		return res.status(400).send(err);
	// 	}
	// },
	async update(req, res) {
		const findOneQuery = 'SELECT * FROM recipe WHERE id=$1';
		const updateOneQuery = 'UPDATE recipe SET title=$1, description=$2, modified_date=$3 WHERE id=$4 returning *';

		try {
			const { rows } = await db.query(findOneQuery, [req.params.id]);
			if(!rows[0]){
				return res.status(404).send({
					message: 'Recipe could not be found'
				})
			}
			const values = [
				req.body.title || rows[0].title,
				req.body.description || rows[0].description,
				moment(new Date()),
				req.params.id
			]

			const response = await db.query(updateOneQuery, values);

			await addIngredients(req.params.id, req.body.ingredients);

			return res.status(200).send(response.rows[0]);
		} catch(err) {
			console.log(err);
			return res.status(400).send(err);
		}
	},
	async delete(req, res){
		const findOneQuery = 'SELECT * FROM recipe WHERE id=$1';
		const deleteQuery = "DELETE FROM recipe WHERE id=$1"

		try {
			const {rows} = await db.query(findOneQuery, [req.params.id]);
			if(!rows[0]){
				
				return res.status(404).send({
					message: "No recipe could be found"
				})
			}

			await db.query(deleteQuery, [req.params.id]);

			return res.status(201).send({
				message: "Recipe deleted",
				id: req.params.id
			});



		} catch (err) {
			return res.status(400).send(err);
		}
	}
}

module.exports = Recipe;