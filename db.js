const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
	console.log('Connected to the Database');
});

function query(query){

}

const createRecipeTable = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS
		recipe(
			id UUID PRIMARY KEY,
			title VARCHAR(128) NOT NULL,
			description VARCHAR(512) NOT NULL,
			created_date TIMESTAMP,
			modified_date TIMESTAMP
		)`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.error(err);
			pool.end();
		})
}

const createIngredientTable = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS
		ingredient(
			recipe_id UUID,
			name VARCHAR(128),
			created_date TIMESTAMP,
			modified_date TIMESTAMP
		)`;

	pool.query(queryText)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.error(err);
			pool.end();
		})
}

const dropTables = () => {
	const dropRecipe = 'DROP TABLE IF EXISTS recipe';
	pool.query(dropRecipe)
		.then((res) => {
			console.log(res);
			pool.end();
		})
		.catch((err) => {
			console.error(err);
			pool.end();
		})

	const dropIngredient = 'DROP TABLE IF EXISTS ingredient';
		pool.query(dropIngredient)
			.then((res) => {
				console.log(res);
				pool.end();
			})
			.catch((err) => {
				console.error(err);
				pool.end();
			})
}

pool.on('remove', () => {
	console.log('Client removed');
	process.exit(0);
});

module.exports = {
	createIngredientTable,
	createRecipeTable,
	dropTables
}

require('make-runnable');