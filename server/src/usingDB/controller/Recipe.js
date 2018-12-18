import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Recipe = {
	async create(req, res) {
		const query = `INSERT INTO
			recipe(id, title, created_date, modified_date)
			VALUES($1, $2, $3, $4)
			returning *`;
		const values = [
			uuidv4(),
			req.body.title,
			moment(new Date()),
			moment(new Date())
		];

		try {
			const { rows } = await db.query(query, values);
			return res.status(201).send(rows[0]);
		} catch (err) {
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

export default Recipe;