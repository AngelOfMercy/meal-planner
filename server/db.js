const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

pool.on('connect', () => {
	console.log('Connected to the Database');
});


const createTables = () => {
	const queryText = `
		CREATE TABLE IF NOT EXISTS
		recipe(
			id UUID PRIMARY KEY,
			title VARCHAR(128) NOT NULL,
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
	const queryText = 'DROPTABLE IF EXISTS recipe';
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

pool.on('remove', () => {
	console.log('Client removed');
	process.exit(0);
});

module.exports = {
	createTables,
	dropTables
}

require('make-runnable');