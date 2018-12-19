//import { Pool } from 'pg';
const pg = require('pg');

if(!process.env.PRODUCTION){
	const dotenv = require('dotenv');
	dotenv.config();
}

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL
});

module.exports = {
	query(text, params){
		return new Promise((resolve, reject) => {
			pool.query(text, params)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				})
		})
	}
}