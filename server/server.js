//server.js

import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill'

import Recipe from './src/usingDB/controller/Recipe';
//import Recipe from './src/controllers/Recipe';

const app = express();

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
	return res.status(200).send({
		message: 'YAY, we have out first endpoint!'
	})
})

app.post('/recipe', Recipe.create);
app.get('/recipe', Recipe.getAll);
app.get('recipe/:id', Recipe.getOne);
app.put('/recipe/:id', Recipe.update);
app.delete('/recipe/:id', Recipe.delete);

//-----------------------------------------------------------

const port = process.env.PORT || 3001

app.listen(port);

console.log('App running on port ', port);